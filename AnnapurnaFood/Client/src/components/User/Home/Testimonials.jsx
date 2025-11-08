// TestiMonials.jsx
import React from "react";
import { Card, CardContent, Typography, Rating } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const testimonials = [
  {
    id: 1,
    name: "Riya Sharma",
    text: "FoodieApp has made my weekends so much better! The food always arrives hot and delicious.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Amit Patel",
    text: "Excellent service! Love the variety of restaurants available on the platform.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    name: "Sneha Verma",
    text: "Super fast delivery and great deals! I’ve been ordering regularly from here.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "Rohit Mehta",
    text: "The food quality and packaging are top-notch. Highly recommend FoodieApp!",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const TestiMonials = () => {
  return (
    <div
      className="testimonials-section py-5"
      style={{
        background: "linear-gradient(135deg, #FF6A00 0%, #EE0979 100%)",
        color: "#fff",
      }}
    >
      <div className="container text-center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          What Our Customers Say ❤️
        </Typography>

        {/* Carousel Section */}
        <Carousel
          fade
          controls={false}
          indicators={true}
          interval={4000}
          pause={false}
        >
          {testimonials.map((t) => (
            <Carousel.Item key={t.id}>
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <Card
                    className="shadow-lg border-0 text-dark"
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      p: 3,
                      backgroundColor: "#fff",
                      position: "relative",
                    }}
                  >
                    <div className="text-center mb-3">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="rounded-circle shadow"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          border: "3px solid #FF6A00",
                        }}
                      />
                    </div>

                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#333",
                          fontStyle: "italic",
                          mb: 2,
                        }}
                      >
                        “{t.text}”
                      </Typography>

                      <Rating
                        name="read-only"
                        value={t.rating}
                        precision={0.1}
                        readOnly
                      />

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mt: 2,
                          color: "#FF6A00",
                        }}
                      >
                        {t.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestiMonials;
