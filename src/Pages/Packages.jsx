import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { Tabs, Tab } from '@mui/material';

const Packages = () => {
    const location = useLocation();
    const response = location.state?.response;

    const [itinerary, setItinerary] = useState(response?.itinerary || []);
    const [hotelList, setHotelList] = useState(response?.hotels || []);
    const [availableActivities, setAvailableActivities] = useState(response?.activities || []);

    const [hotels, setHotels] = useState([]);

    // Update the hotel list
    useEffect(() => {
        const uniqueHotels = hotelList
            .filter((hotel, index, self) =>
                self.findIndex(h => h.name === hotel.name) === index
            );
        setHotels(uniqueHotels);
    }, [hotelList]);

    // Handle drag start for activities
    const handleActivityDragStart = (event, activity) => {
        if (activity) {
            event.dataTransfer.setData("activity", JSON.stringify(activity));
        }
    };

    // Handle drag start for hotels
    const handleHotelDragStart = (event, hotel) => {
        if (hotel) {
            event.dataTransfer.setData("hotel", JSON.stringify(hotel));
        }
    };

    // Handle drop for activities into itinerary
    const handleActivityDrop = (event, dayIndex, activityIndex) => {
        try {
            const draggedActivity = JSON.parse(event.dataTransfer.getData("activity"));
            if (draggedActivity) {
                const updatedItinerary = [...itinerary];
                updatedItinerary[dayIndex].activities[activityIndex].activity = draggedActivity;
                setItinerary(updatedItinerary);

                const updatedAvailableActivities = availableActivities.filter(
                    (act) => act !== draggedActivity
                );
                setAvailableActivities(updatedAvailableActivities);
            }
        } catch (error) {
            alert("Error: Could not process the dragged activity. Please try again.");
            console.error("Error parsing dragged activity:", error);
        }
    };

    // Handle drop for hotels into itinerary
    const handleHotelDrop = (event, dayIndex) => {
        try {
            const draggedHotel = JSON.parse(event.dataTransfer.getData("hotel"));
            if (draggedHotel) {
                const updatedItinerary = [...itinerary];
                updatedItinerary[dayIndex].hotel = draggedHotel;
                setItinerary(updatedItinerary);
                setHotelList(prevList => prevList.filter(hotel => hotel !== draggedHotel)); // Remove the hotel from the available list
            }
        } catch (error) {
            alert("Error: Could not process the dragged hotel. Please try again.");
            console.error("Error parsing dragged hotel:", error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    if (!response) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Typography variant="h6" className="text-gray-500">
                    Loading itinerary...
                </Typography>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-6 py-10 bg-gray-100 min-h-screen">
                <p className="text-3xl font-semibold text-gray-800">Itinerary & Hotels</p>
                <p className="text-gray-600">(Drag and drop Available Activities and Hotels)</p>

                <div className="grid grid-cols-[2fr,1fr] gap-8 mt-6">
                    {/* Itinerary Section */}
                    <div className="grid grid-cols-[1fr] gap-8 ">
                        {itinerary?.slice(0, -1)?.map((day, dayIndex) => (
                            <Card
                                key={dayIndex}
                                className="shadow-md rounded-xl border border-gray-300 bg-white hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardContent>
                                    <Box className="mb-6">
                                        <Typography variant="h5" className="font-semibold mb-2">
                                            {day?.day}
                                        </Typography>
                                        <Divider className="bg-gray-200" />
                                    </Box>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Activities */}
                                        <Box>
                                            <ul className="space-y-4">
                                                {day?.activities?.map((activityObj, activityIndex) => (
                                                    <li
                                                        key={activityIndex}
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) =>
                                                            handleActivityDrop(e, dayIndex, activityIndex)
                                                        }
                                                        className="flex items-start gap-2 p-2 border rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Typography variant="subtitle2" className="text-gray-500 font-medium">
                                                            {activityObj?.time || "Time"}
                                                        </Typography>
                                                        <Typography variant="body2" className="text-gray-700">
                                                            {activityObj?.activity || "Drop activity here"}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>

                                        {/* Hotel */}
                                        <Box
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleHotelDrop(e, dayIndex)}
                                            className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50"
                                        >
                                            <Typography variant="h6" className="font-semibold text-gray-800">
                                                {day?.hotel?.name || "Drag hotel here"}
                                            </Typography>
                                            {day?.hotel && (
                                                <Box className="space-y-2 mt-2">
                                                    <Typography variant="body2" className="text-gray-500">
                                                        Location: {day?.hotel?.location || "N/A"}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-500">
                                                        Amenities: {day?.hotel?.amenities?.join(", ") || "N/A"}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-500">
                                                        Price: {day?.hotel?.price || "N/A"}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-500">
                                                        Overview: {day?.hotel?.overview || "N/A"}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Available Hotels Section */}
                    <div className="p-4 bg-white shadow-md rounded-lg h-[80vh] sticky top-10">
                        <div className="mb-4">
                            <Typography variant="h5" className="font-semibold mb-4">
                                Available Hotels
                            </Typography>
                            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="tabs for hotels and activities">
                                <Tab label="Hotels" />
                                <Tab label="Activities" />
                            </Tabs>
                            <div>
                                {selectedTab === 0 && (
                                    <Box p={3}>
                                        {/* Hotels List */}
                                        <div className="flex flex-col gap-4 overflow-y-auto  max-h-[60vh] scrollbar-hidden">
                                            {hotels.map((hotel, index) => (
                                                <div
                                                    key={index}
                                                    draggable
                                                    onDragStart={(e) => handleHotelDragStart(e, hotel)}
                                                    className="p-2 bg-blue-100 text-blue-800 rounded shadow cursor-pointer"
                                                >
                                                    <Typography variant="h6">{hotel.name}</Typography>
                                                    <Typography variant="body2" className="text-gray-600">
                                                        Location: {hotel.location || "N/A"}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-600">
                                                        Price: {hotel.price || "N/A"}
                                                    </Typography>
                                                    <Typography variant="body2" className="text-gray-600">
                                                        Amenities: {hotel.amenities?.join(", ") || "N/A"}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </Box>
                                )}
                                {selectedTab === 1 && (
                                    <Box p={3}>
                                        {/* Activities List */}
                                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] scrollbar-hidden">
                                            {availableActivities.map((activity, index) => (
                                                <div
                                                    key={index}
                                                    draggable
                                                    onDragStart={(e) => handleActivityDragStart(e, activity)}
                                                    className="p-2 bg-blue-100 text-blue-800 rounded shadow cursor-pointer"
                                                >
                                                    {activity}
                                                </div>
                                            ))}
                                        </div>
                                    </Box>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Packages;
