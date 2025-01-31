// GlobalStyles.js
import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;

    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }
`;

const InputField = styled.input`
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    width: 100%;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const SelectField = styled.select`
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    width: 100%;
    background-color: white;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const SubmitButton = styled.button`
    padding: 14px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`;

const FormLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #666;
`;

const FormRow = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

const AutocompleteWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const SuggestionsList = styled.ul`
    position: absolute;
    width: 100%;
    margin-top: 4px;
    padding: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
`;

const SuggestionItem = styled.li`
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f0f0f0;
    }
`;


const BackButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
        background: #f0f8ff;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;
const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const HeaderBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ResultsContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
`;

const FlightCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
`;

const AirlineInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
`;

const Price = styled.div`
    font-size: 24px;
    color: #007bff;
    font-weight: bold;
`;

const FlightInfo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: start;
`;

const Timeline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 24px;
        bottom: 24px;
        width: 2px;
        background-color: #ddd;
    }
`;

const TimePoint = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #007bff;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #007bff;
    z-index: 1;
    margin: 10px 0;
`;

const FlightDetails = styled.div`
    padding: 0 10px;
`;

const Time = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Airport = styled.div`
    color: #666;
    margin-bottom: 15px;
`;

const FlightMetadata = styled.div`
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 14px;
    margin-top: 15px;
    flex-wrap: wrap;
`;

const DetailsButton = styled.button`
    background: none;
    border: 1px solid #007bff;
    color: #007bff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: #007bff;
        color: white;
    }
`;

const ExtendedDetails = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
`;

const DetailSection = styled.div`
    margin-bottom: 15px;
`;

const DetailTitle = styled.h4`
    color: #333;
    margin-bottom: 8px;
    font-size: 16px;
`;

const DetailContent = styled.div`
    color: #666;
    font-size: 14px;
    line-height: 1.5;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    border: 1px solid #007bff;
    background: ${props => props.active ? '#007bff' : 'white'};
    color: ${props => props.active ? 'white' : '#007bff'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 40px;

    &:hover:not(:disabled) {
        background: #007bff;
        color: white;
    }

    &:disabled {
        background: #f0f0f0;
        border-color: #ddd;
        color: #999;
        cursor: not-allowed;
    }
`;

const PageEllipsis = styled.span`
    padding: 8px;
    color: #666;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const NoResults = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
    background: #f9f9f9;
    border-radius: 8px;
    margin-top: 20px;
`;

const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ResultsTitle = styled.h2`
    color: #333;
    margin: 0;
`;

const ResultsCount = styled.div`
    color: #666;
    font-size: 14px;
`;

export {
    FormContainer,
    InputField,
    SelectField,
    SubmitButton,
    FormGroup,
    FormLabel,
    FormRow,
    AutocompleteWrapper,
    SuggestionsList,
    SuggestionItem,
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
    ResultsTitle,
    ResultsCount


};