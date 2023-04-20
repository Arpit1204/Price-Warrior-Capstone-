import React, { useEffect } from "react";
import "./admin.css";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import loadin from '../asseets/loadinghd7.gif'


function AdminFormPut() {
  const { id } = useParams();
  console.log(id);
  const [isHide, setIsHide] = useState(true);
  const userName = sessionStorage.getItem('username')


  useEffect(() => {
    const api = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DataBase_link_to_Access_data}/gameGet/${id}`
      );

      setName(res.data.name);
      setLastName(res.data.lastName);
      setHomeGenre(res.data.homeGenre);
      setDeveloper(res.data.developer);
      setPublisher(res.data.publisher);
      setDescription(res.data.description);
      setDetailImage(res.data.detailImage);
      setHomeImage(res.data.homeImage);
      setIsLatest(res.data.isLatest);
      setIsUpcoming(res.data.isUpcoming);
      setRating(res.data.rating);
      setReleaseDate(res.data.releaseDate);
      setTrailer(res.data.trailer);
      setEditions(res.data.editions);
      setCurrentAvg(res.data.currentAvg);
      setCurrentMin(res.data.currentMin);
      setCurrentMax(res.data.currentMax);
      setHistoryMax(res.data.historyMax);
      setHistoryAvg(res.data.historyAvg);
      setHistoryMin(res.data.historyMin);
      setMinimumRequirements(res.data.minimumRequirements);
      setRecommendedRequirements(res.data.recommendedRequirements);
      setPrice(res.data.prices);
      setGenres(res.data.genres);
      setTags(res.data.tags);
      setRelatedLinks(res.data.relatedLinks);
      setCrousel(res.data.crouselImage);
      setAbc(res.data.userEditAccess)
      setSentence(`${userName} updated this game on ${res.data.updatedAt.slice(0,10)}`)

      setTimeout(() => setIsHide(false), 2000);
    };

    api();
  }, [id]);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeGenre, setHomeGenre] = useState("");
  const [homeImage, setHomeImage] = useState("");
  const [detailImage, setDetailImage] = useState("");
  const [isLatest, setIsLatest] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [rating, setRating] = useState(0);
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [trailer, setTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [currentMin, setCurrentMin] = useState("");
  const [currentAvg, setCurrentAvg] = useState("");
  const [currentMax, setCurrentMax] = useState("");
  const [historyMin, setHistoryMin] = useState("");
  const [historyAvg, setHistoryAvg] = useState("");
  const [historyMax, setHistoryMax] = useState("");
  const [sentence, setSentence] = useState("");
  const [abc, setAbc] = useState([])
  const [editions, setEditions] = useState([{ editionName: "" }]);

  const [minimumRequirements, setMinimumRequirements] = useState([
    {
      specs: "",
      info: "",
    },
  ]);

  const [relatedLinks, setRelatedLinks] = useState([
    {
      mssg: "",
      link: "",
    },
  ]);

  const [recommendedRequirements, setRecommendedRequirements] = useState([
    {
      specs: "",
      info: "",
    },
  ]);
  const [prices, setPrice] = useState([
    {
      name: "",
      site: "",
      price: "",
    },
  ]);

  const [genres, setGenres] = useState([
    {
      genre: "",
    },
  ]);
  const [tags, setTags] = useState([
    {
      tag: "",
    },
  ]);

  const [crousel, setCrousel] = useState([
    {
      link: "",
    },
  ]);

  const handleEditionsChange = (event, index) => {
    let data = [...editions];
    data[index][event.target.name] = event.target.value;

    setEditions(data);
  };

  const handleGenreChange = (event, index) => {
    let data = [...genres];
    data[index][event.target.name] = event.target.value;

    setGenres(data);
  };

  const handleTagChange = (event, index) => {
    let data = [...tags];
    data[index][event.target.name] = event.target.value;

    setTags(data);
  };

  const handleCrouselChange = (event, index) => {
    let data = [...crousel];
    data[index][event.target.name] = event.target.value;

    setCrousel(data);
  };

  const handlePriceChange = (event, index) => {
    let data = [...prices];
    data[index][event.target.name] = event.target.value;

    setPrice(data);
  };

  const handleMinimumRequirementChange = (event, index) => {
    let data = [...minimumRequirements];
    data[index][event.target.name] = event.target.value;

    setMinimumRequirements(data);
  };

  const handleRecommendedRequirementChange = (event, index) => {
    let data = [...recommendedRequirements];
    data[index][event.target.name] = event.target.value;

    setRecommendedRequirements(data);
  };

  const handleRelatedLinksChange = (event, index) => {
    let data = [...relatedLinks];
    data[index][event.target.name] = event.target.value;

    setRelatedLinks(data);
  };

  const addRelatedLinks = () => {
    let obj = {
      mssg: "",
      link: "",
    };
    setRelatedLinks([...relatedLinks, obj]);
  };

  const addRecommendedRequirement = () => {
    let obj = {
      specs: "",
      info: "",
    };
    setRecommendedRequirements([...recommendedRequirements, obj]);
  };

  const addMinimumRequirement = () => {
    let obj = {
      specs: "",
      info: "",
    };
    setMinimumRequirements([...minimumRequirements, obj]);
  };

  const addPrice = () => {
    let obj = {
      name: "",
      site: "",
      price: "",
    };
    setPrice([...prices, obj]);
  };

  const addCrousel = () => {
    let obj = {
      link: "",
    };
    setCrousel([...crousel, obj]);
  };

  const addTag = () => {
    let obj = {
      tag: "",
    };
    setTags([...tags, obj]);
  };

  const addGenres = () => {
    let obj = {
      genre: "",
    };
    setGenres([...genres, obj]);
  };

  const addEditions = () => {
    let obj = {
      editionName: "",
    };
    setEditions([...editions, obj]);
  };

  const removeEditions = () => {};
  const Token=sessionStorage.getItem("token")

  const Update =  (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      lastName !== "" &&
      homeGenre !== "" &&
      homeImage !== "" &&
      detailImage !== ""
    ) {
       fetch(
        `${process.env.REACT_APP_DataBase_link_to_Access_data}/gamePut/${id}`,
        {
          // Adding method type
          method: "PUT",

          headers: {
            'Authorization': 'Bearer ' + Token,
            "Content-type": "application/json; charset=UTF-8",
          },
          
          // Adding body or contents to send
          body: JSON.stringify({
            name: name,
            lastName: lastName,
            homeGenre: homeGenre,
            homeImage: homeImage,
            detailImage: detailImage,
            rating: rating,
            isLatest: isLatest,
            isUpcoming: isUpcoming,
            editions: editions,
            developer: developer,
            publisher: publisher,
            releaseDate: releaseDate,
            genres: genres,
            trailer: trailer,
            description: description,
            tags: tags,
            crouselImage: crousel,
            prices: prices,
            minimumRequirements: minimumRequirements,
            recommendedRequirements: recommendedRequirements,
            relatedLinks: relatedLinks,
            currentMin: currentMin,
            currentAvg: currentAvg,
            currentMax: currentMax,
            historyMin: historyMin,
            historyAvg: historyAvg,
            historyMax: historyMax,
            sentence:sentence,
            userEditAccess:abc

          }),
          
        }
      )
        // Converting to JSON
        .then((response) => response.json())

        // Displaying results to console
        .then((json) => console.log(json));
      window.location.href = "/games";
    }
  };

  return (
    <div className="admin-form-outer-div">
      {isHide ? (
        <div className="abc">
        <img src={loadin} alt="image description" />
        <h1>Loading...</h1>
      </div>
      ) : (
        <form className="adminForm" onSubmit={(e) => Update(e)}>
          <div className="form-div">
            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Name </h2>
                </label>
                <div className="admin-search-form">
                  <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Last Name </h2>
                </label>
                <div className="admin-search-form">
                  <input
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Home Genre </h2>
                </label>
                <div className="admin-search-form">
                  <input
                    placeholder="Genre For Home"
                    value={homeGenre}
                    type="text"
                    onChange={(e) => setHomeGenre(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-div">
                <div className="each-labe-input">
                  <label>
                    <h2>Home Image </h2>
                  </label>
                  <div className="admin-search-form">
                    <input
                      placeholder="Image for Home"
                      value={homeImage}
                      type="text"
                      onChange={(e) => setHomeImage(e.target.value)}
                    />
                  </div>
                </div>

                
              </div>
            </div>

            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Is Latest </h2>
                </label>
                <div className="select-admin-search-form">
                  <select
                    value={isLatest}
                    onChange={(e) => setIsLatest(e.target.value)}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                {isLatest}
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Is Upcoming </h2>
                </label>
                <div className="select-admin-search-form">
                  <select
                    value={isUpcoming}
                    onChange={(e) => setIsUpcoming(e.target.value)}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>
                {isUpcoming}
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Rating</h2>
                </label>
                <div className="admin-search-form">
                  <input
                    placeholder="Rating"
                    value={rating}
                    type="number"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Trailer</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Trailer Link"
                    value={trailer}
                    type="text"
                    onChange={(e) => setTrailer(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                  <label>
                    <h2>Detail Image</h2>
                  </label>
                  <div className="admin-search-form-2">
                    <input
                      placeholder="Img for detail page"
                      value={detailImage}
                      type="text"
                      onChange={(e) => setDetailImage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="each-labe-input">
                  <label>
                    <h2>Updator Name</h2>
                  </label>
                  <div className="admin-search-form-2">
                    <input
                      placeholder="Updator name"
                      value={sentence}
                      type="text"
                      onChange={(e) => setSentence(e.target.value)}
                    />
                  </div>
                </div>

              
            </div>

            <div className="input-div">
            <div className="each-labe-input">
                <label>
                  <h2>Description</h2>
                </label>
                <div className="admin-search-form-3">
                  <textarea
                    placeholder="Description"
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              

              
            </div>

            <div className="input-div">
              <div>
                <div className="each-labe-input">
                  <label>
                    <h2>Editions</h2>
                    <div style={{ display: "flex" }}>
                      <h3
                        style={{
                          background: "white",
                          borderRadius: "0.5rem",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                          width: "min-content",
                          marginLeft: "1rem",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          fontSize: "2rem",
                        }}
                        onClick={addEditions}
                      >
                        +
                      </h3>
                      <h3
                        style={{
                          background: "white",
                          borderRadius: "0.5rem",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                          width: "min-content",
                          marginLeft: "1rem",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          fontSize: "2rem",
                        }}
                        onClick={removeEditions}
                      >
                        -
                      </h3>
                    </div>
                  </label>
                  {editions.map((edition, index) => {
                    return (
                      <div className="admin-search-form">
                        <input
                          name="editionName"
                          placeholder="Edition Name"
                          onChange={(event) =>
                            handleEditionsChange(event, index)
                          }
                          value={edition.editionName}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="each-labe-input">
                  <label>
                    <h2>Genres</h2>
                    <h3
                      style={{
                        background: "white",
                        borderRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        width: "min-content",
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "2rem",
                      }}
                      onClick={addGenres}
                    >
                      +
                    </h3>
                  </label>
                  {genres.map((genre, index) => {
                    return (
                      <div className="admin-search-form">
                        <input
                          name="genre"
                          placeholder="Genre"
                          onChange={(event) => handleGenreChange(event, index)}
                          value={genre.genre}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="input-div">
              <div>
                <div className="each-labe-input">
                  <label>
                    <h2>Tags</h2>
                    <h3
                      style={{
                        background: "white",
                        borderRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        width: "min-content",
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "2rem",
                      }}
                      onClick={addTag}
                    >
                      +
                    </h3>
                  </label>
                  {tags.map((tag, index) => {
                    return (
                      <div className="admin-search-form">
                        <input
                          name="tag"
                          placeholder="Tags"
                          onChange={(event) => handleTagChange(event, index)}
                          value={tag.tag}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="each-labe-input">
                  <label>
                    <h2>Crousel Image</h2>
                    <h3
                      style={{
                        background: "white",
                        borderRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        width: "min-content",
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "2rem",
                      }}
                      onClick={addCrousel}
                    >
                      +
                    </h3>
                  </label>
                  {crousel.map((crousel, index) => {
                    return (
                      <div className="admin-search-form">
                        <input
                          name="link"
                          placeholder="Crousel Img Link"
                          onChange={(event) =>
                            handleCrouselChange(event, index)
                          }
                          value={crousel.link}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Current Min</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Currently Minimum"
                    value={currentMin}
                    type="text"
                    onChange={(e) => setCurrentMin(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Current Avg</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Current Average"
                    value={currentAvg}
                    type="text"
                    onChange={(e) => setCurrentAvg(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Current Max</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Current Maximum"
                    type="text"
                    value={currentMax}
                    onChange={(e) => setCurrentMax(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Historically Min</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Historically Minimum"
                    value={historyMin}
                    type="text"
                    onChange={(e) => setHistoryMin(e.target.value)}
                  />
                </div>
                {historyMin}
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Historically Avg</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Historically Average"
                    value={historyAvg}
                    type="text"
                    onChange={(e) => setHistoryAvg(e.target.value)}
                  />
                </div>
                {historyAvg}
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>HistoricallyMax</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Historically Maximum"
                    type="text"
                    value={historyMax}
                    onChange={(e) => setHistoryMax(e.target.value)}
                  />
                </div>
                {historyMax}
              </div>
            </div>

            <div className="input-div">
              <div className="each-labe-input">
                <label>
                  <h2>Developer</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Developer Name"
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Publisher</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Publisher Name"
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
              </div>

              <div className="each-labe-input">
                <label>
                  <h2>Release Date</h2>
                </label>
                <div className="admin-search-form-2">
                  <input
                    placeholder="Release Date"
                    type="text"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="each-labe-input">
                <label>
                  <h2>Related Links</h2>
                  <h3
                    style={{
                      background: "white",
                      borderRadius: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      width: "min-content",
                      marginLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "2rem",
                    }}
                    onClick={addRelatedLinks}
                  >
                    +
                  </h3>
                </label>
                {relatedLinks.map((relatedLinks, index) => {
                  return (
                    <>
                      <div className="input-div">
                        <div className="admin-search-form">
                          <input
                            name="mssg"
                            placeholder="Message"
                            onChange={(event) =>
                              handleRelatedLinksChange(event, index)
                            }
                            value={relatedLinks.mssg}
                          />
                        </div>

                        <div className="admin-search-form">
                          <input
                            name="link"
                            placeholder="Link"
                            onChange={(event) =>
                              handleRelatedLinksChange(event, index)
                            }
                            value={relatedLinks.link}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="each-labe-input">
                <label>
                  <h2>Minimum Requirements</h2>
                  <h3
                    style={{
                      background: "white",
                      borderRadius: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      width: "min-content",
                      marginLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "2rem",
                    }}
                    onClick={addMinimumRequirement}
                  >
                    +
                  </h3>
                </label>
                {minimumRequirements.map((requirement, index) => {
                  return (
                    <>
                      <div className="input-div">
                        <div className="admin-search-form">
                          <input
                            name="specs"
                            placeholder="Specification"
                            onChange={(event) =>
                              handleMinimumRequirementChange(event, index)
                            }
                            value={requirement.specs}
                          />
                        </div>

                        <div className="admin-search-form">
                          <input
                            name="info"
                            placeholder="Requirement"
                            onChange={(event) =>
                              handleMinimumRequirementChange(event, index)
                            }
                            value={requirement.info}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="each-labe-input">
                <label>
                  <h2>Recommended Requirements</h2>
                  <h3
                    style={{
                      background: "white",
                      borderRadius: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      width: "min-content",
                      marginLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "2rem",
                    }}
                    onClick={addRecommendedRequirement}
                  >
                    +
                  </h3>
                </label>
                {recommendedRequirements.map((requirement, index) => {
                  return (
                    <>
                      <div className="input-div">
                        <div className="admin-search-form">
                          <input
                            name="specs"
                            placeholder="Specification"
                            onChange={(event) =>
                              handleRecommendedRequirementChange(event, index)
                            }
                            value={requirement.specs}
                          />
                        </div>

                        <div className="admin-search-form">
                          <input
                            name="info"
                            placeholder="Requirement"
                            onChange={(event) =>
                              handleRecommendedRequirementChange(event, index)
                            }
                            value={requirement.info}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            {/* <div className='input-div'> */}
            <div>
              <div className="each-labe-input">
                <label>
                  <h2>Prices</h2>
                  <h3
                    style={{
                      background: "white",
                      borderRadius: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      width: "min-content",
                      marginLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "2rem",
                    }}
                    onClick={addPrice}
                  >
                    +
                  </h3>
                </label>
                {prices.map((prices, index) => {
                  return (
                    <>
                      <div className="input-div">
                        <div className="admin-search-form-2">
                          <input
                            name="name"
                            placeholder="Game Name "
                            onChange={(event) =>
                              handlePriceChange(event, index)
                            }
                            value={prices.name}
                          />
                        </div>

                        <div className="admin-search-form-2">
                          <input
                            name="site"
                            placeholder="Site Name"
                            onChange={(event) =>
                              handlePriceChange(event, index)
                            }
                            value={prices.site}
                          />
                        </div>

                        <div className="admin-search-form-2">
                          <input
                            name="price"
                            placeholder="Price"
                            onChange={(event) =>
                              handlePriceChange(event, index)
                            }
                            value={prices.price}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* </div> */}

            <h3
              style={{
                background: "white",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                marginLeft: "2rem",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "2rem",
              }}
              onClick={(e) => Update(e)}
            >
              Update!
            </h3>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminFormPut;
