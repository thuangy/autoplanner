class SearchController < ApplicationController

  skip_before_action :verify_authenticity_token

  CLIENT_ID = "hT4cv0YtPMX2Na0leTwicg"
  CLIENT_SECRET = "sbIL3XyK8xSJdYHJWMiwsql0XEX8TBjq0VAjswcBONbGIAuEvvfRfsV8j29wJBQZ"


  # Constants, do not change these
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"  # trailing / because we append the business id to the path
  TOKEN_PATH = "/oauth2/token"
  GRANT_TYPE = "client_credentials"

  SEARCH_LIMIT = 3

  def bearer_token
    # Put the url together
    url = "#{API_HOST}#{TOKEN_PATH}"

    raise "Please set your CLIENT_ID" if CLIENT_ID.nil?
    raise "Please set your CLIENT_SECRET" if CLIENT_SECRET.nil?

    # Build our params hash
    params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE
    }

    response = HTTP.post(url, params: params)
    parsed = response.parse

    "#{parsed['token_type']} #{parsed['access_token']}"
  end

  def restaurants
    url = "#{API_HOST}#{SEARCH_PATH}"

    searchQuery = {
      location: params[:location],
      limit: params[:days],
      sort_by: "rating",
      radius: 1000,
      price: "1,2",
      categories: params[:categories]
    }

    response = HTTP.auth(bearer_token).get(url, params: searchQuery)
    render json: {results: response.parse}
  end

  def activities
    url = "#{API_HOST}#{SEARCH_PATH}"

    searchQuery = {
      term: "Fun Things To Do",
      location: params[:location],
      limit: params[:days],
      sort_by: "rating",
      categories: params[:categories]
    }

    response = HTTP.auth(bearer_token).get(url, params: searchQuery)
    render json: {results: response.parse}
  end
end
