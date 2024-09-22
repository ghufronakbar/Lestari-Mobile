export interface ReverseGeocodingResponse {
    type: string;
    features: Feature[];
    query: Query;
  }
  
  interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
    bbox: number[];
  }
  
  interface Properties {
    datasource: Datasource;
    country: string;
    country_code: string;
    region: string;
    state: string;
    county: string;
    city: string;
    postcode: string;
    lon: number;
    lat: number;
    distance: number;
    result_type: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    timezone: Timezone;
    plus_code: string;
    rank: Rank;
    place_id: string;
  }
  
  interface Datasource {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  }
  
  interface Timezone {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  }
  
  interface Rank {
    importance: number;
    popularity: number;
  }
  
  interface Geometry {
    type: string;
    coordinates: number[];
  }
  
  interface Query {
    lat: number;
    lon: number;
    plus_code: string;
  }
  