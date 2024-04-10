require 'httparty'
require 'json'

namespace :earthquake do
  desc "Fetch earthquake data"
  task fetch: :environment do
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    response = HTTParty.get(url)
    data = JSON.parse(response.body)

    data['features'].each do |feature|
      id = feature['id']
      magnitude = feature['properties']['mag']
      place = feature['properties']['place']
      time = Time.at(feature['properties']['time'] / 1000)
      url = feature['properties']['url']
      tsunami = feature['properties']['tsunami']
      mag_type = feature['properties']['magType']
      title = feature['properties']['title']
      longitude = feature['geometry']['coordinates'][0]
      latitude = feature['geometry']['coordinates'][1]

      next if title.nil? || url.nil? || place.nil? || mag_type.nil? || longitude.nil? || latitude.nil?
      next if magnitude < -1.0 || magnitude > 10.0
      next if latitude < -90.0 || latitude > 90.0
      next if longitude < -180.0 || longitude > 180.0

      next if Feature.exists?(external_id: id)

      Feature.create(
        external_id: id,
        magnitude: magnitude,
        place: place,
        time: time,
        url: url,
        tsunami: tsunami,
        mag_type: mag_type,
        title: title,
        longitude: longitude,
        latitude: latitude
      )
    end
  end
end