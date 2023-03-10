const CLIENT_ID = "c7dcfaa3740442c2be8b11f035539845";
const CLIENT_SECRET = "f7017db86d2243b79d6d5d59943055dc";

export const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};
export const getTracks = async (token, tracksEndPoint) => {
  const limit = 20;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.items;
};

export const getTrack = async (token, trackEndPoint) => {
  const result = await fetch(`${trackEndPoint}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data;
};

export const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

export const getPlaylistByGenre = async (token, genreId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};

const getAlbum = async (token) => {
  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/albums`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  console.log(data);
  return data.items;
};

export const getSearch = async (token, searchInput, type) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${searchInput}&type=${type}`,
    {
      //dfd = "artist%2Calbum"
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  console.log(data);
  return data;
};
