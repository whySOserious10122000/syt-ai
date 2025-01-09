import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import myImage from "../Images/vendor-display.png";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Define the form structure as before
const formSteps = [
  {
    image: myImage,
    slogan: "Explore the World with Comfort",
    fields: [
      {
        label: "Destination",
        name: "destination",
        type: "text",
        required: true,
      },
      {
        label: "Departure",
        name: "departure",
        type: "text",
        required: true,
      },
      {
        label: "Category",
        name: "category",
        type: "select",
        required: true,
        multiple: true,
        options: [
          "Historical",
          "Pilgrimage",
          "Adventure",
          "Wildlife",
          "Honeymoon",
          "Nature",
          "Beach",
        ],
      },
      {
        label: "Total Days",
        name: "total_travel_days",
        type: "increment-decrement",
        required: true,
      },
    ],
  },
  {
    image: myImage,
    slogan: "Let the Adventure Begin",
    fields: [
      {
        label: "Total Adults",
        name: "total_adult",
        type: "select",
        required: true,
        options: Array.from({ length: 12 }, (_, i) => i + 1),
      },
      {
        label: "Total Children",
        name: "total_child",
        type: "select",
        required: false,
        options: Array.from({ length: 12 }, (_, i) => i + 1),
      },
      {
        label: "Infant",
        name: "infant",
        type: "select",
        required: false,
        options: Array.from({ length: 12 }, (_, i) => i + 1),
      },
      { label: "Sightseeing", name: "sightseeing", type: "select", required: false, options: ["Include", "Exclude"] },
      { label: "Travel By", name: "travel_by", type: "select", required: true, multiple: true, options: ["Bus", "Car", "Train", "Flight"] },
      { label: "Personal Care", name: "personal_care", type: "radio", required: false },
      { label: "Additional Requirement", name: "additional_requirement", type: "textarea", required: false },
    ],
  },
  {
    image: myImage,
    slogan: "Luxury Tours Await You",
    fields: [
      {
        label: "Hotel Type",
        name: "hotel_type",
        type: "select",
        required: false,
        multiple: true,
        options: [
          "2 Star",
          "4 Star",
          "Any",
          "Budget Property",
          "3 Star",
          "5 Star",
          "Not Required"
        ],
      },
      {
        label: "Meals Required",
        name: "meal_require",
        type: "select",
        required: false,
        multiple: true,
        options: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        label: "Meals Type",
        name: "meal_type",
        type: "select",
        required: false,
        multiple: true,
        options: ["Veg", "Non-Veg"],
      },
    ],
  },
  {
    image: myImage,
    slogan: "Let's Make Your Stay Comfortable",
    fields: [
      { label: "Full Name", name: "full_name", type: "text", required: true },
      { label: "Email Address", name: "email_address", type: "email", required: true },
      { label: "Mobile No.", name: "mobile_no", type: "tel", required: true },
      { label: "City", name: "city", type: "text", required: true },
      { label: "State", name: "state", type: "text", required: true },
      { label: "Budget Per Person", name: "budget_per_person", type: "number", required: true },
    ],
  },
];

const UserForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tripDetails: {
      departure: "",
      destination: "",
      category: {
        pilgrimage: false,
        historical: false,
        wildlife: false,
        beach: false,
        honeymoon: false,
        nature: false,
        adventure: false,
      },
      numberOfPeople: {
        adults: 0,
        children: 0,
        infants: 0,
      },
      travelBy: {
        train: false,
        bus: false,
        flight: false,
        carCab: false,
      },
      sightseeing: {
        include: true,
        exclude: false,
      },
      dateOfTravel: {
        from: "",
        to: "",
      },
      hotelType: {
        star: 3,
      },
      mealsRequired: {
        notRequired: false,
        breakfast: false,
        lunch: false,
        dinner: false,
      },
      mealsType: {
        veg: true,
        nonVeg: false,
      },
      extraRequirements: "",
      userDetails: {
        name: "",
        email: "",
        phoneNumber: "",
        budget: 0,
      },
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      if (type === "checkbox") {
        const [field, category] = name.split(".");
        return {
          ...prevData,
          [field]: {
            ...prevData[field],
            [category]: checked,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleIncrement = () => {
    setFormData((prevData) => ({
      ...prevData,
      total_travel_days: prevData.total_travel_days + 1,
    }));
  };

  const handleDecrement = () => {
    if (formData.total_travel_days > 0) {
      setFormData((prevData) => ({
        ...prevData,
        total_travel_days: prevData.total_travel_days - 1,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // Handle submit (POST API call)
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://travelassist.onrender.com/generate-travel-plan", formData);
      // Navigate to /packages page with response data
      navigate("/packages", { state: { data: response.data } });
    } catch (error) {
      console.error("Error during form submission", error);
    }
  };

  return (
    <div
      className="relative h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Left Side: Slogan */}
        <div className="md:w-1/2 text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-bold">{formSteps[currentStep].slogan}</h2>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <form>
            {formSteps[currentStep].fields.map((field, index) => (
              <div className="relative mb-4" key={index}>
                {field.type === "text" || field.type === "email" || field.type === "tel" ? (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    type={field.type}
                    required={field.required}
                    variant="outlined"
                    size="small"
                  />
                ) : field.type === "number" ? (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    type={field.type}
                    required={field.required}
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                ) : field.type === "select" ? (
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      multiple={field.multiple || false}
                      value={formData[field.name] || (field.multiple ? [] : "")}
                      onChange={handleChange}
                      name={field.name}
                      label={field.label}
                      required={field.required}
                    >
                      {field.options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : field.type === "radio" ? (
                  <FormControl component="fieldset">
                    <RadioGroup
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                ) : field.type === "increment-decrement" ? (
                  <div className="flex items-center w-[25%] text-center">
                    <IconButton onClick={handleDecrement} color="primary" aria-label="decrement">
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.name}
                      value={formData[field.name] || 0}
                      onChange={handleChange}
                      type="number"
                      required={field.required}
                      variant="outlined"
                      size="small"
                      inputProps={{ min: 0 }}
                      disabled
                    />
                    <IconButton onClick={handleIncrement} color="primary" aria-label="increment">
                      <AddIcon />
                    </IconButton>
                  </div>
                ) : field.type === "textarea" ? (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                  />
                ) : null}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <Button variant="outlined" onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
              {currentStep === formSteps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleSubmit} // Call the submit function here
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>Next</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
