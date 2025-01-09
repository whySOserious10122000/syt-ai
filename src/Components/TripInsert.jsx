import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";

const TripDetailsForm = () => {
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData((prev) => ({
        ...prev,
        tripDetails: { ...prev.tripDetails, [name]: type === "checkbox" ? checked : value },
      }));
    } else if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        tripDetails: {
          ...prev.tripDetails,
          [keys[0]]: {
            ...prev.tripDetails[keys[0]],
            [keys[1]]: type === "checkbox" ? checked : value,
          },
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/trip-details", formData.tripDetails);
      alert("Data submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      style={{
        padding: "20px",
        width: "50%",
        margin: "auto",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Trip Details Form
        </Typography>

        <Grid container spacing={2}>
          {/* Departure */}
          <Grid item xs={12}>
            <TextField
              label="Departure"
              name="departure"
              value={formData.tripDetails.departure}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
              style={{ marginBottom: "15px" }}
            />
          </Grid>

          {/* Destination */}
          <Grid item xs={12}>
            <TextField
              label="Destination"
              name="destination"
              value={formData.tripDetails.destination}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
              style={{ marginBottom: "15px" }}
            />
          </Grid>

          {/* Categories */}
          <Grid item xs={12}>
            <Typography variant="h6">Categories</Typography>
            <Grid container spacing={2}>
              {Object.keys(formData.tripDetails.category).map((key) => (
                <Grid item xs={4} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.tripDetails.category[key]}
                        onChange={handleChange}
                        name={`category.${key}`}
                        color="primary"
                      />
                    }
                    label={key}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Number of People */}
          <Grid item xs={4}>
            <TextField
              label="Adults"
              name="numberOfPeople.adults"
              type="number"
              value={formData.tripDetails.numberOfPeople.adults}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Children"
              name="numberOfPeople.children"
              type="number"
              value={formData.tripDetails.numberOfPeople.children}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Infants"
              name="numberOfPeople.infants"
              type="number"
              value={formData.tripDetails.numberOfPeople.infants}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Grid>

          {/* Travel By */}
          <Grid item xs={12}>
            <Typography variant="h6">Travel By</Typography>
            <Grid container spacing={2}>
              {Object.keys(formData.tripDetails.travelBy).map((key) => (
                <Grid item xs={4} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.tripDetails.travelBy[key]}
                        onChange={handleChange}
                        name={`travelBy.${key}`}
                        color="primary"
                      />
                    }
                    label={key}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Date of Travel */}
          <Grid item xs={6}>
            <TextField
              label="Date From"
              type="date"
              name="dateOfTravel.from"
              value={formData.tripDetails.dateOfTravel.from}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date To"
              type="date"
              name="dateOfTravel.to"
              value={formData.tripDetails.dateOfTravel.to}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              variant="outlined"
              color="primary"
            />
          </Grid>

          {/* User Details */}
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="userDetails.name"
              value={formData.tripDetails.userDetails.name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="userDetails.email"
              value={formData.tripDetails.userDetails.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="userDetails.phoneNumber"
              value={formData.tripDetails.userDetails.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Budget"
              name="userDetails.budget"
              type="number"
              value={formData.tripDetails.userDetails.budget}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              color="primary"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              style={{ marginTop: "20px" }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TripDetailsForm;
