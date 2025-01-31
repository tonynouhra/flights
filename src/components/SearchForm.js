// SearchForm.js
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchFlights, getConfig} from '../services/apiService';
import {
    FormContainer,
    InputField,
    SubmitButton,
    SelectField,
    FormGroup,
    FormLabel,
    FormRow
} from '../styles/GlobalStyles';
import AutocompleteInput from './AutocompleteInput';

const SearchForm = ({onSearch}) => {
    const navigate = useNavigate();
    const [from, setFrom] = useState({displayValue: '', skyId: null, entityId: null});
    const [to, setTo] = useState({displayValue: '', skyId: null, entityId: null});
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cabinClass, setCabinClass] = useState('');
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState('');
    const [infants, setInfants] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');

    useEffect(() => {

        const loadConfig = async () => {
            try {
                const config = await getConfig();
                const uniqueCurrencies = config.data.map(item => ({
                    code: item.currency,
                    symbol: item.currencySymbol,
                    title: item.currencyTitle
                }));
                const uniqueCurrencyList = Array.from(
                    new Map(uniqueCurrencies.map(item => [item.code, item])).values()
                );
                setCurrencies(uniqueCurrencyList);
            } catch (error) {
                console.error('Error loading config:', error);
                setError('Error loading currency options');
            }
        };

        loadConfig();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!from.skyId || !from.entityId || !to.skyId || !to.entityId) {
            setError('Please select valid airports from the suggestions');
            return;
        }

        setLoading(true);

        try {
            const searchParams = {
                originSkyId: from.skyId,
                destinationSkyId: to.skyId,
                originEntityId: from.entityId,
                destinationEntityId: to.entityId,
                date,
                adults: Number(adults)
            };

            if (isRoundTrip && returnDate) {
                searchParams.returnDate = returnDate;
            }
            if (cabinClass) searchParams.cabinClass = cabinClass;
            if (childrens) searchParams.childrens = Number(childrens);
            if (infants) searchParams.infants = Number(infants);
            if (sortBy) searchParams.sortBy = sortBy;
            if (selectedCurrency) searchParams.currency = selectedCurrency;

            const results = await searchFlights(searchParams);
            console.log('Search Results:', results); // Debug log
            onSearch(results);
            navigate('/results');

        } catch (error) {
            console.error('Error fetching flight data:', error);
            setError('Unable to find flights. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormRow>
                <AutocompleteInput
                    placeholder="From"
                    value={from}
                    onChange={setFrom}
                />
                <AutocompleteInput
                    placeholder="To"
                    value={to}
                    onChange={setTo}
                />
            </FormRow>

            <FormRow>
                <FormGroup>
                    <FormLabel>Trip Type</FormLabel>
                    <SelectField
                        value={isRoundTrip ? 'true' : 'false'}
                        onChange={(e) => setIsRoundTrip(e.target.value === 'true')}
                    >
                        <option value="false">One Way</option>
                        <option value="true">Round Trip</option>
                    </SelectField>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Cabin Class</FormLabel>
                    <SelectField value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
                        <option value="">Select Class</option>
                        <option value="economy">Economy</option>
                        <option value="premium_economy">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </SelectField>
                </FormGroup>
            </FormRow>

            <FormRow>
                <FormGroup>
                    <FormLabel>Departure Date</FormLabel>
                    <InputField
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </FormGroup>

                {isRoundTrip && (
                    <FormGroup>
                        <FormLabel>Return Date</FormLabel>
                        <InputField
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            required
                            min={date || new Date().toISOString().split('T')[0]}
                        />
                    </FormGroup>
                )}
            </FormRow>

            <FormRow>
                <FormGroup>
                    <FormLabel>Adults (12+ years)</FormLabel>
                    <InputField
                        type="number"
                        min="1"
                        max="9"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Children (2-12 years)</FormLabel>
                    <InputField
                        type="number"
                        min="0"
                        max="9"
                        value={childrens}
                        onChange={(e) => setChildrens(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Infants (Under 2)</FormLabel>
                    <InputField
                        type="number"
                        min="0"
                        max="9"
                        value={infants}
                        onChange={(e) => setInfants(e.target.value)}
                    />
                </FormGroup>
            </FormRow>

            <FormRow>
                <FormGroup>
                    <FormLabel>Currency</FormLabel>
                    <SelectField
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                        <option value="">Select Currency</option>
                        {currencies.map((curr) => (
                            <option key={curr.code} value={curr.code}>
                                {curr.title} ({curr.symbol})
                            </option>
                        ))}
                    </SelectField>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Sort By</FormLabel>
                    <SelectField value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Select Sort Order</option>
                        <option value="best">Best</option>
                        <option value="price_high">Cheapest</option>
                        <option value="fastest">Fastest</option>
                        <option value="outbound_take_off_time">Outbound Take Off Time</option>
                        <option value="outbound_landing_time">Outbound Landing Time</option>
                        <option value="return_take_off_time">Return Take Off Time</option>
                        <option value="return_landing_time">Return Landing Time</option>
                    </SelectField>
                </FormGroup>
            </FormRow>

            {error && <div style={{color: 'red'}}>{error}</div>}

            <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search Flights'}
            </SubmitButton>
        </FormContainer>
    );
};

export default SearchForm;