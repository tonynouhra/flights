// AutocompleteInput.js
import React, {useState, useEffect, useRef} from 'react';
import {
    InputField,
    AutocompleteWrapper,
    SuggestionsList,
    SuggestionItem
} from '../styles/GlobalStyles';
import {searchAirports} from '../services/apiService';

const AutocompleteInput = ({placeholder, value, onChange}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    const fetchSuggestions = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const airportSuggestions = await searchAirports(query);
            setSuggestions(airportSuggestions);
        } catch (error) {
            console.error('Error fetching airports:', error);
            setSuggestions([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange({
            displayValue: inputValue,
            skyId: null,
            entityId: null
        });
        fetchSuggestions(inputValue);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        const skyId = suggestion.skyId;
        const title = suggestion.presentation.title;
        const subtitle = suggestion.presentation.subtitle;
        const entityId = suggestion.navigation.entityId;

        onChange({
            displayValue: `${title} (${skyId}) - ${subtitle}`,
            skyId,
            entityId
        });
        setShowSuggestions(false);
    };

    return (
        <AutocompleteWrapper ref={wrapperRef}>
            <InputField
                type="text"
                placeholder={placeholder}
                value={value.displayValue || ''}
                onChange={handleInputChange}
                onFocus={() => value.displayValue?.length >= 2 && setShowSuggestions(true)}
            />

            {showSuggestions && (
                <SuggestionsList>
                    {loading ? (
                        <SuggestionItem>Loading...</SuggestionItem>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <SuggestionItem
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.presentation.title} ({suggestion.skyId})
                                - {suggestion.presentation.subtitle}
                            </SuggestionItem>
                        ))
                    ) : value.displayValue?.length >= 2 ? (
                        <SuggestionItem>No airports found</SuggestionItem>
                    ) : null}
                </SuggestionsList>
            )}
        </AutocompleteWrapper>
    );
};

export default AutocompleteInput;