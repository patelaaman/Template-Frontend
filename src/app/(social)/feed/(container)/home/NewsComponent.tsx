import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Modal,
  Button,
  Col
} from "react-bootstrap";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  
  const API_KEY = "5c81eb77bf374a7abe724824a72f66e2"; // Use environment variables

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=business&apiKey=${API_KEY}`
        );
        const data = await response.json();
        if (data.articles) {
          const combinedNews = injectCustomNews(data.articles);
          setNews(combinedNews);
        }
      } catch (error) {
        console.error("Error fetching business news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessNews();
  }, []);

  // Inject custom news at a random index
  const injectCustomNews = (articles) => {
    const customNews = [
      {
        title: "India has made our platform for business: BUSINESSROOM AI",
        description:
          "Businessroom is a social media platform designed to connect entrepreneurs, co-founders, and investors...",
        source: { name: "Businessroom" },
        publishedAt: new Date().toISOString(),
        url: "https://businessroom.ai",
        urlToImage: "https://businessroom.ai/image.jpg",
      },
      {
        title: "Acquireroom: The Marketplace for Buying & Selling Businesses",
        description:
          "Acquireroom, a new feature in Businessroom, allows businesses to find buyers or investors worldwide...",
        source: { name: "Acquireroom" },
        publishedAt: new Date().toISOString(),
        url: "https://businessroom.ai/acquireroom",
        urlToImage: "https://businessroom.ai/acquireroom.jpg",
      },
    ];

    const randomIndex = Math.floor(Math.random() * (articles.length + 1));
    articles.splice(randomIndex, 0, ...customNews);
    return articles;
  };

  // Function to handle opening the modal
  const openModal = (article) => {
    setSelectedNews(article);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <Col sm={6} lg={12}>
      <Card>
        <CardHeader className="pb-0 border-0 ms-1">
          <CardTitle className="mb-2">Today's News</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <p>Loading business news...</p>
          ) : (
            news.map((article, index) => (
              <div key={index} className="mb-3">
                <h6 className="mb-0">
                  <span
                    style={{
                      cursor: "pointer",
                      color: "black",
                      textDecoration: "none",
                    }}
                    onClick={() => openModal(article)}
                  >
                    {article.title}
                  </span>
                </h6>
                <small>{new Date(article.publishedAt).toLocaleTimeString()}</small>
              </div>
            ))
          )}
        </CardBody>
      </Card>

      {/* News Modal */}
      <Modal show={modalOpen} onHide={closeModal}>
        {selectedNews && (
          <>
            <Modal.Header >
              <Modal.Title>{selectedNews.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedNews.urlToImage && (
                <img
                  src={selectedNews.urlToImage}
                  alt="news"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <p>{selectedNews.description || "No description available."}</p>
              <p>
                <strong>Source:</strong> {selectedNews.source?.name || "Unknown"}
              </p>
              <p>
                <strong>Published At:</strong>{" "}
                {new Date(selectedNews.publishedAt).toLocaleString()}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" href={selectedNews.url} target="_blank">
                Read More
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Col>
  );
};

export default NewsComponent;
