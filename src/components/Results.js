// Results.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    BackButton,
    HeaderTop,
    HeaderBottom,
    ResultsContainer,
    FlightCard,
    Title,
    AirlineInfo,
    Price,
    FlightInfo,
    Timeline,
    TimePoint,
    FlightDetails,
    Time,
    Airport,
    FlightMetadata,
    DetailsButton,
    ExtendedDetails,
    DetailSection,
    DetailTitle,
    DetailContent,
    PaginationContainer,
    PageButton,
    PageEllipsis,
    LoadingMessage,
    NoResults,
    ResultsHeader,
    ResultsCount
} from '../styles/GlobalStyles';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

const ITEMS_PER_PAGE = 5;

const Results = ({flights}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState(null);

    if (!flights) {
        return (
            <ResultsContainer>
                <LoadingMessage>Loading flights...</LoadingMessage>
            </ResultsContainer>
        );
    }

    if (!flights.data?.itineraries?.length) {
        return (
            <ResultsContainer>
                <NoResults>No flights found matching your criteria</NoResults>
            </ResultsContainer>
        );
    }

    const totalPages = Math.ceil(flights.data.itineraries.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFlights = flights.data.itineraries.slice(startIndex, endIndex);

    const renderPaginationButtons = () => {
        const buttons = [];
        const showEllipsisStart = currentPage > 3;
        const showEllipsisEnd = currentPage < totalPages - 2;

        buttons.push(
            <PageButton
                key="prev"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
            >
                ←
            </PageButton>
        );

        buttons.push(
            <PageButton
                key={1}
                onClick={() => setCurrentPage(1)}
                active={currentPage === 1}
            >
                1
            </PageButton>
        );

        if (showEllipsisStart) {
            buttons.push(<PageEllipsis key="ellipsis-start">...</PageEllipsis>);
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (i <= currentPage + 1 && i >= currentPage - 1) {
                buttons.push(
                    <PageButton
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        active={currentPage === i}
                    >
                        {i}
                    </PageButton>
                );
            }
        }

        if (showEllipsisEnd) {
            buttons.push(<PageEllipsis key="ellipsis-end">...</PageEllipsis>);
        }

        if (totalPages > 1) {
            buttons.push(
                <PageButton
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    active={currentPage === totalPages}
                >
                    {totalPages}
                </PageButton>
            );
        }

        buttons.push(
            <PageButton
                key="next"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
            >
                →
            </PageButton>
        );

        return buttons;
    };

    return (
        <ResultsContainer>
            <ResultsHeader>
                <HeaderTop>
                    <BackButton onClick={() => navigate('/')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Search
                    </BackButton>
                </HeaderTop>
                <HeaderBottom>
                    <ResultsCount>
                        {flights.data.itineraries.length} flights found
                    </ResultsCount>
                </HeaderBottom>
            </ResultsHeader>

            {currentFlights.map((itinerary) => {
                const leg = itinerary.legs[0];
                const isExpanded = expandedCard === itinerary.id;

                return (
                    <FlightCard key={itinerary.id}>
                        <Title>
                            <AirlineInfo>
                                <img
                                    src={leg.carriers.marketing[0].logoUrl}
                                    alt={leg.carriers.marketing[0].name}
                                />
                                {leg.carriers.marketing[0].name}
                            </AirlineInfo>
                            <Price>{itinerary.price.formatted}</Price>
                        </Title>

                        <FlightInfo>
                            <Timeline>
                                <TimePoint/>
                                <TimePoint/>
                            </Timeline>
                            <FlightDetails>
                                <div>
                                    <Time>{formatDate(leg.departure)}</Time>
                                    <Airport>{leg.origin.city} - {leg.origin.name} ({leg.origin.displayCode})</Airport>
                                </div>
                                <div>
                                    <Time>{formatDate(leg.arrival)}</Time>
                                    <Airport>{leg.destination.city} - {leg.destination.name} ({leg.destination.displayCode})</Airport>
                                </div>
                            </FlightDetails>
                        </FlightInfo>

                        <FlightMetadata>
                            <div>Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m</div>
                            <div>Type: {leg.stopCount === 0 ? 'Nonstop' : `${leg.stopCount} stops`}</div>
                            <div>Flight: {leg.segments[0].flightNumber}</div>
                        </FlightMetadata>

                        <DetailsButton onClick={() => setExpandedCard(isExpanded ? null : itinerary.id)}>
                            {isExpanded ? 'Hide Details' : 'View Details'}
                        </DetailsButton>

                        {isExpanded && (
                            <ExtendedDetails>
                                <DetailSection>
                                    <DetailTitle>Flight Schedule</DetailTitle>
                                    <DetailContent>
                                        <div>Departure: {formatFullDate(leg.departure)}</div>
                                        <div>Arrival: {formatFullDate(leg.arrival)}</div>
                                        {leg.timeDeltaInDays > 0 && (
                                            <div>Arrives {leg.timeDeltaInDays} day{leg.timeDeltaInDays > 1 ? 's' : ''} later</div>
                                        )}
                                    </DetailContent>
                                </DetailSection>

                                <DetailSection>
                                    <DetailTitle>Aircraft Details</DetailTitle>
                                    <DetailContent>
                                        <div>Operating Airline: {leg.segments[0].operatingCarrier.name}</div>
                                        <div>Flight Number: {leg.segments[0].flightNumber}</div>
                                    </DetailContent>
                                </DetailSection>

                                {leg.stopCount > 0 && (
                                    <DetailSection>
                                        <DetailTitle>Stops</DetailTitle>
                                        <DetailContent>
                                            {leg.segments.map((segment, index) => (
                                                <div key={index}>
                                                    Stop {index + 1}: {segment.destination.name} ({segment.destination.displayCode})
                                                </div>
                                            ))}
                                        </DetailContent>
                                    </DetailSection>
                                )}

                                <DetailSection>
                                    <DetailTitle>Price Details</DetailTitle>
                                    <DetailContent>
                                        <div>Total Price: {itinerary.price.formatted}</div>
                                    </DetailContent>
                                </DetailSection>
                            </ExtendedDetails>
                        )}
                    </FlightCard>
                );
            })}

            <PaginationContainer>
                {renderPaginationButtons()}
            </PaginationContainer>
        </ResultsContainer>
    );
};

export default Results;