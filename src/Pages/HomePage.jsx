import React, { useState } from "react";
import { TextField, Button, IconButton, Autocomplete, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [days, setDays] = useState(1); // Default value for days
    const [categories, setCategories] = useState([]); // Selected categories
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [personalCare, setPersonalCare] = useState("no"); // Default value for personal care
    const [sightseeing, setSightseeing] = useState("exclude"); // Default value for sightseeing
    const [travelBy, setTravelBy] = useState([]); // Selected travel options
    const [hotelType, setHotelType] = useState([]); // Selected hotel types
    const [mealsRequired, setMealsRequired] = useState([]); // Meals required options
    const [mealType, setMealType] = useState([]); // Meal type options
    const [additionalRequirement, setAdditionalRequirement] = useState(""); // Additional requirement
    const [userName, setUserName] = useState(""); // User name
    const [email, setEmail] = useState(""); // Email
    const [number, setNumber] = useState(""); // Number
    const [state, setState] = useState(""); // State
    const [city, setCity] = useState(""); // City
    const [price, setPrice] = useState(""); // Price

    const [destination, setDestination] = useState(""); // Destination  
    const [departure, setDeparture] = useState(""); // departure  

    const categoryOptions = [
        "Pilgrimage",
        "Historical",
        "Wildlife",
        "Beach",
        "Honeymoon",
        "Adventure",
        "Nature",
    ];

    const travelOptions = ["Bus", "Train", "Flight", "Car"];
    const hotelOptions = [
        "2 Star",
        "3 Star",
        "4 Star",
        "5 Star",
        "Budget Property",
        "Not Required",
        "Any"
    ];
    const mealOptions = ["Breakfast", "Lunch", "Dinner"];
    const mealTypeOptions = ["Non-Veg", "Veg"];
    const numberOptions = Array.from({ length: 13 }, (_, i) => i); // Options 0 to 12

    // Increment days
    const handleIncrement = () => {
        setDays((prev) => prev + 1);
    };

    // Decrement days
    const handleDecrement = () => {
        if (days > 1) setDays((prev) => prev - 1);
    };


    const transformCategories = (selectedCategories) => {
        const allCategories = categoryOptions.map((cat) => cat.toLowerCase());
        return allCategories.reduce((acc, cat) => {
            acc[cat] = selectedCategories.includes(cat) || selectedCategories.includes(cat.charAt(0).toUpperCase() + cat.slice(1));
            return acc;
        }, {});
    };

    const transformTravelBy = (selectedTravel) => {
        return travelOptions.reduce((acc, option) => {
            const key = option.toLowerCase() === "car" ? "carCab" : option.toLowerCase();
            acc[key] = selectedTravel.includes(option);
            return acc;
        }, {});
    };

    const transformMealsRequired = (selectedMeals) => {
        return {
            notRequired: !selectedMeals.length,
            breakfast: selectedMeals.includes("Breakfast"),
            lunch: selectedMeals.includes("Lunch"),
            dinner: selectedMeals.includes("Dinner"),
        };
    };

    const transformMealType = (selectedMealType) => {
        return {
            veg: selectedMealType.includes("Veg"),
            nonVeg: selectedMealType.includes("Non-Veg"),
        };
    };

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const payload = {
            tripDetails: {
                departure: departure,
                destination: destination,
                category: transformCategories(categories),
                numberOfPeople: {
                    adults: Number(adults),
                    children: Number(children),
                    infants: Number(infants),
                },
                travelBy: transformTravelBy(travelBy),
                sightseeing: {
                    include: sightseeing === "include",
                    exclude: sightseeing === "exclude",
                },
                dateOfTravel: {
                    from: dateRange[0] ? dayjs(dateRange[0]).format("YYYY-MM-DD") : "",
                    to: dateRange[1] ? dayjs(dateRange[1]).format("YYYY-MM-DD") : "",
                },
                hotelType: {
                    star: hotelType.includes("3 Star") ? 3 : hotelType.includes("4 Star") ? 4 : hotelType.includes("5 Star") ? 5 : 0,
                },
                mealsRequired: transformMealsRequired(mealsRequired),
                mealsType: transformMealType(mealType),
                extraRequirements: additionalRequirement,
                userDetails: {
                    name: userName,
                    email,
                    phoneNumber: number,
                    budget: Number(price),
                },
            },
        };

        setLoading(true)

        try {
            const response = await axios.post("https://travelassist.onrender.com/generate-itinerary", payload);
            if (response.data) {
                setLoading(false)
            }

            // Navigate to the /packages page and pass the response data
            navigate("/packages", { state: { response: response.data } });
        } catch (error) {
            console.error("Error:", error);
            setLoading(false)
            alert("Failed to generate itinerary. Please try again later.");
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
            <div className="w-1/2 max-w-lg bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Travel Planner</h2>
                <form className="space-y-6">
                    {/* User Name */}
                    <div className="flex flex-col">
                        <TextField
                            label="User Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    {/* State */}
                    <div className="flex flex-col">
                        <TextField
                            label="State"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>

                    {/* City */}
                    <div className="flex flex-col">
                        <TextField
                            label="City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <TextField
                            label="Price"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Sightseeing */}
                    <div className="flex flex-col">
                        <FormControl fullWidth>
                            <InputLabel>Sightseeing</InputLabel>
                            <Select
                                value={sightseeing}
                                onChange={(e) => setSightseeing(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="include">Include</MenuItem>
                                <MenuItem value="exclude">Exclude</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* Adults, Children, Infants */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <TextField
                                label="Adults"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/3">
                            <TextField
                                label="Children"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/3">
                            <TextField
                                label="Infants"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={infants}
                                onChange={(e) => setInfants(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Destination Input */}
                    <div className="flex flex-col">
                        <TextField
                            label="Destination"
                            variant="outlined"
                            size="small"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            fullWidth
                        />
                    </div>

                    {/* Departure Input */}
                    <div className="flex flex-col">
                        <TextField
                            label="Departure"
                            variant="outlined"
                            size="small"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            fullWidth
                        />
                    </div>

                    {/* Date Range Picker */}
                    <div className="flex flex-col">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangePicker
                                startText="Start Date"
                                endText="End Date"
                                value={dateRange}
                                onChange={(newValue) => setDateRange(newValue)}
                                renderInput={(startProps, endProps) => (
                                    <div className="flex gap-4">
                                        <TextField {...startProps} size="small" fullWidth />
                                        <TextField {...endProps} size="small" fullWidth />
                                    </div>
                                )}
                            />
                        </LocalizationProvider>
                    </div>

                    {/* Increment/Decrement for Days */}
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 font-medium">Number of Days</p>
                        <div className="flex items-center gap-4">
                            <IconButton
                                onClick={handleDecrement}
                                size="small"
                                className="bg-gray-200 hover:bg-gray-300"
                            >
                                <Remove />
                            </IconButton>
                            <TextField
                                value={days}
                                size="small"
                                inputProps={{
                                    readOnly: true,
                                    style: { textAlign: "center" },
                                }}
                                className="w-20"
                            />
                            <IconButton
                                onClick={handleIncrement}
                                size="small"
                                className="bg-gray-200 hover:bg-gray-300"
                            >
                                <Add />
                            </IconButton>
                        </div>
                    </div>

                    {/* Multi-select Dropdown for Categories */}
                    <div className="flex flex-col">
                        <Autocomplete
                            multiple
                            options={categoryOptions}
                            value={categories}
                            onChange={(event, newValue) => setCategories(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    label="Categories"
                                />
                            )}
                        />
                    </div>

                    {/* Multi-select Dropdown for Hotel Type */}
                    <div className="flex flex-col">
                        <Autocomplete
                            multiple
                            options={hotelOptions}
                            value={hotelType}
                            onChange={(event, newValue) => setHotelType(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    label="Hotel Type"
                                />
                            )}
                        />
                    </div>

                    {/* Multi-select Dropdown for Meals Required */}
                    <div className="flex flex-col">
                        <Autocomplete
                            multiple
                            options={mealOptions}
                            value={mealsRequired}
                            onChange={(event, newValue) => setMealsRequired(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    label="Meals Required"
                                />
                            )}
                        />
                    </div>

                    {/* Multi-select Dropdown for Meal Type */}
                    <div className="flex flex-col">
                        <Autocomplete
                            multiple
                            options={mealTypeOptions}
                            value={mealType}
                            onChange={(event, newValue) => setMealType(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    label="Meal Type"
                                />
                            )}
                        />
                    </div>

                    {/* Additional Requirement (Text Area) */}
                    <div className="flex flex-col">
                        <TextField
                            label="Additional Requirement"
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            fullWidth
                            value={additionalRequirement}
                            onChange={(e) => setAdditionalRequirement(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button
                            variant="contained"
                            color="primary"
                            className="w-40"
                            style={{
                                textTransform: "none",
                                borderRadius: "20px",
                                padding: "8px 16px",
                            }}
                            onClick={handleSubmit}
                            disabled={loading} // Disable the button when loading
                        >
                            {loading ? (
                                <CircularProgress
                                    size={20}
                                    style={{
                                        color: "white", // Match the button text color
                                    }}
                                />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Homepage;
