// HeroSection.jsx
import React from "react";
import { Button, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
      title: "Delicious Burgers Delivered Fresh 🍔",
      subtitle: "Order your favorite meals anytime, anywhere!",
      buttonText: "Order Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
      title: "Hot Pizzas, Melting Cheese 🍕",
      subtitle: "Get your pizza delivered in minutes.",
      buttonText: "Explore Menu",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1200&q=80",
      title: "Fresh & Healthy Salads 🥗",
      subtitle: "Taste freshness with every bite.",
      buttonText: "View Restaurants",
    },
    {
      id: 4,
      image: "assets/images/hero-bg.jpg",
      title: "Fresh & Healthy Salads 🥗",
      subtitle: "Taste freshness with every bite.",
      buttonText: "View Restaurants",
    },
  ];

  return (
    <Carousel
      fade
      controls={false}
      indicators={true}
      interval={3500}
      pause={false}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          {/* Background Image */}
          <div
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "90vh",
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {/* Overlay Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
              }}
            ></div>

            {/* Text and Button Overlay */}
            <div
              className="text-center px-3"
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "700px",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                  "@media (max-width:600px)": { fontSize: "1.8rem" },
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 400,
                  "@media (max-width:600px)": { fontSize: "1rem" },
                }}
              >
                {slide.subtitle}
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#FF6A00",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "50px",
                  px: 4,
                  py: 1.3,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    backgroundColor: "#EE0979",
                  },
                }}
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;
