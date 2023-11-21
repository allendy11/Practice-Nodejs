import React, { useState, useEffect } from "react";
import axios from "axios";

const S3bucket = () => {
  const [bucketList, setBucketList] = useState({
    count: 0,
    list: [],
  });
  const [objectList, setObjectList] = useState({
    count: 0,
    list: [],
  });
  const [image, setImage] = useState(null);
  const handleClick = (e, name) => {
    axios({
      method: "GET",
      url: `https://localhost:8000/aws/bucket/${name}`,
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }).then((res) => {
      console.log(res.status, res.data);
      const list = res.data.contents;
      setObjectList({
        count: list.length,
        list,
      });
    });
  };

  const getImage = () => {
    axios({
      method: "GET",
      url: `https://localhost:8000/aws/image`,
      headers: {
        "Content-Type": "image/*",
        withCredentials: true,
      },
    }).then((res) => {
      console.log(res.status, res.data);
      let file = res.data;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImage();
      };
      fileReader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/aws/bucket",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }).then((res) => {
      console.log(res.status, res.data);
      const { count, list } = res.data;
      console.log(count, list);
      setBucketList({
        count,
        list,
      });
    });
  }, []);

  const getFile = () => {
    axios({
      method: "GET",
      url: "https://localhost:8000/aws/bucket",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }).then((res) => {
      console.log(res.status, res.data);
    });
  };
  // console.log(objectList.list);
  // console.log(bucketList.list);
  console.log(image);
  return (
    <div>
      <h3>{`bucket list ${bucketList.count}`}</h3>
      <ul>
        {bucketList.list.length > 0 &&
          bucketList.list.map((el) => {
            return (
              <li>
                {el.Name}
                <button onClick={(e) => handleClick(e, el.name)}>
                  get object
                </button>
              </li>
            );
          })}
      </ul>
      <div>
        <ul>
          {objectList.list.length > 0 &&
            objectList.list.map((el) => {
              return <li>{el.Key}</li>;
            })}
        </ul>
      </div>
      <button onClick={(e) => getImage()}>get image</button>
      {image ? (
        <div
          style={{
            width: "10rem",
            height: "10rem",
            objectFit: "contain",
            backgroundColor: "red",
          }}
        >
          <img src={image} alt="" />
        </div>
      ) : null}

      <div>
        <button onClick={(e) => getFile()}>get fiile</button>
      </div>

      <div></div>
    </div>
  );
};

export default S3bucket;
