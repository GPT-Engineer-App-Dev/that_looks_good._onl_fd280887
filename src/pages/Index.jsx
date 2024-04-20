import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, Heading } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
    contactInfo: "",
    shippingDetails: "",
    materialType: "",
    materialSpecs: "",
    desiredSize: "",
    sampleLocations: "",
    file: null
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const generateTrackingNumber = () => {
    return "CYK" + Date.now().toString().slice(-8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNum = generateUniqueNumber();
    const trackNum = generateTrackingNumber();
    setUniqueNumber(uniqueNum);
    setTrackingNumber(trackNum);

    // TODO: Email automation to send form data, unique number, and tracking number
    toast({
      title: "Form Submitted.",
      description: `Your unique number is ${uniqueNum} and your tracking number is ${trackNum}.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const printLabel = () => {
    // TODO: Implement label printing functionality
    alert(`Print Shipping Label:\nCyklop CSC Att.: SampleLab M.Slot [${uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland\nTracking Number: ${trackingNumber}`);
  };

  return (
    <Box bg="#002F5D" minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={5}>
          <Heading as="h1" size="xl" color="white">
            Shipment Tracking and Sample Request
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email Address</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
          </FormControl>
          <FormControl id="sampleInfo" isRequired>
            <FormLabel color="white">Sample Information</FormLabel>
            <Input name="sampleInfo" value={formData.sampleInfo} onChange={handleInputChange} placeholder="Describe the sample" />
          </FormControl>
          <FormControl id="contactInfo" isRequired>
            <FormLabel color="white">Contact Information</FormLabel>
            <Input name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} placeholder="Enter your contact details" />
          </FormControl>
          <FormControl id="shippingDetails" isRequired>
            <FormLabel color="white">Shipping Details</FormLabel>
            <Input name="shippingDetails" value={formData.shippingDetails} onChange={handleInputChange} placeholder="Enter shipping details" />
          </FormControl>
          <FormControl id="materialType" isRequired>
            <FormLabel color="white">Material Type</FormLabel>
            <Input name="materialType" value={formData.materialType} onChange={handleInputChange} placeholder="Specify the material type" />
          </FormControl>
          <FormControl id="materialSpecs" isRequired>
            <FormLabel color="white">Material Specifications</FormLabel>
            <Input name="materialSpecs" value={formData.materialSpecs} onChange={handleInputChange} placeholder="Enter material specifications" />
          </FormControl>
          <FormControl id="desiredSize" isRequired>
            <FormLabel color="white">Desired Size</FormLabel>
            <Input name="desiredSize" value={formData.desiredSize} onChange={handleInputChange} placeholder="Specify the desired size" />
          </FormControl>
          <FormControl id="sampleLocations" isRequired>
            <FormLabel color="white">Sample Locations</FormLabel>
            <Input name="sampleLocations" value={formData.sampleLocations} onChange={handleInputChange} placeholder="Describe possible sample locations" />
          </FormControl>
          <FormControl id="file" isRequired>
            <FormLabel color="white">Upload File</FormLabel>
            <Input name="file" type="file" onChange={handleFileChange} accept=".vector, .pdf, .png, .bmp, .jpg, .ai, .plt" />
          </FormControl>
          <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={handleSubmit} isDisabled={trackingNumber != null}>
            Submit Request
          </Button>
          {trackingNumber && (
            <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={printLabel}>
              Print Shipping Label
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
