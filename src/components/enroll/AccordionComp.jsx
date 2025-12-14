import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

const AccordionComp = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const accordionData = [
    {
      id: "panel1",
      title: "What is your return policy?",
      content: "We offer a 30-day return policy on all items. Items must be unused and in their original packaging. Please contact our customer service team to initiate a return."
    },
    {
      id: "panel2",
      title: "How long does shipping take?",
      content: "Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days. International shipping may take up to 14 business days."
    },
    {
      id: "panel3",
      title: "Do you ship internationally?",
      content: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping page for more details."
    },
   
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Accordions */}
      {accordionData.map((item, index) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          sx={{
            marginBottom: 2,
            borderRadius: "12px !important",
            border: "1px solid #e5e7eb",
            boxShadow: expanded === item.id 
              ? "0 4px 12px rgba(16, 185, 129, 0.15)" 
              : "0 2px 4px rgba(0, 0, 0, 0.05)",
            "&:before": {
              display: "none",
            },
            "&.Mui-expanded": {
              margin: "0 0 16px 0",
            },
            transition: "all 0.3s ease",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: expanded === item.id ? "var(--color-main)" : "#6b7280",
                  fontSize: 28,
                  transition: "all 0.3s ease",
                }}
              />
            }
            aria-controls={`${item.id}d-content`}
            id={`${item.id}d-header`}
            sx={{
              backgroundColor: expanded === item.id ? "#f0fdf4" : "#ffffff",
              borderRadius: "12px",
              minHeight: "72px",
              padding: "0 20px",
              "&:hover": {
                backgroundColor: "#f0fdf4",
              },
              "&.Mui-expanded": {
                minHeight: "72px",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottom: "1px solid #e5e7eb",
              },
              "& .MuiAccordionSummary-content": {
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
                gap: 2,
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                transition: "transform 0.3s ease",
              },
            }}
          >
            {/* Number Badge */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: expanded === item.id ? "var(--color-main)" : "#e5e7eb",
                color: expanded === item.id ? "#ffffff" : "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
                marginRight: 2,
              }}
            >
              {index + 1}
            </Box>

            <Typography
              component="span"
              sx={{
                fontSize: "1.125rem",
                fontWeight: expanded === item.id ? 600 : 500,
                color: expanded === item.id ? "var(--color-main)" : "#1f2937",
                transition: "all 0.3s ease",
                flex: 1,
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#ffffff",
              padding: "24px 24px 24px 76px",
            }}
          >
            <Typography
              sx={{
                color: "#4b5563",
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionComp;