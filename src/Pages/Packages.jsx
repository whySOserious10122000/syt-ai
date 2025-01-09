import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const Packages = () => {
    const location = useLocation();
    const response = location.state?.response;

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
        <div className="container mx-auto px-6 py-10 bg-gray-100 min-h-screen">
            <Typography
                variant="h4"
                className="text-center font-bold text-gray-800"
            >
                Your Travel Itinerary
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {response?.itinerary?.map((day, index) => (
                    <Card
                        key={index}
                        className="shadow-md rounded-xl border border-gray-300 bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardContent>
                            <Box className="mb-6">
                                <Typography
                                    variant="h5"
                                    className="font-semibold  mb-2"
                                >
                                    {day?.day}
                                </Typography>
                                <Divider className="bg-gray-200" />
                            </Box>
                            <ul className="space-y-4">
                                {day?.activities?.map((activity, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            className="text-gray-500 font-medium"
                                        >
                                            {activity?.time}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="text-gray-700"
                                        >
                                            {activity?.activity}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Packages;
