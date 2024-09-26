// src/InfiniteScrollImages.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Box, 
    Grid, 
    Card, 
    Text, 
    CardBody, 
    Image, 
    Spinner, 
    Center, 
    Heading 
} from '@chakra-ui/react';

const UNSPLASH_ACCESS_KEY = 'nUN9dbU6-l-UE60duALC-FJQBBxevAxlSbijwpBKjwY'; // Add your Unsplash API key here

function InfiniteScrollImages() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                `https://api.unsplash.com/photos?_limit=20&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            setData((prev) => [...prev, ...result.data]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 2
            ) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box p={5}>
            <Grid 
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
                gap={4}
                justifyContent="center"
            >
                {data.map((item) => (
                    <Card 
                        key={item.id} 
                        borderWidth={1} 
                        borderRadius="md" 
                        overflow="hidden" 
                        boxShadow="md" 
                        maxW="300px"
                        mx="auto"
                        transition="transform 0.3s" 
                        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                        <CardBody>
                            <Image 
                                src={item.urls.regular} 
                                alt={item.alt_description || item.description || "Unsplash Image"} 
                                borderRadius="md" 
                                mb={2} 
                                objectFit="cover" 
                                boxSize="250px" 
                            />
                            <Heading size="md" mb={2} textAlign="center">
                                {item.user.name} 
                            </Heading>
                            <Text fontSize="sm" textAlign="center" noOfLines={2}>
                                {item.description || "Untitled"}
                            </Text>
                        </CardBody>
                    </Card>
                ))}
            </Grid>
            {loading && (
                <Center my={4}>
                    <Spinner size="xl" />
                </Center>
            )}
        </Box>
    );
}

export default InfiniteScrollImages;
