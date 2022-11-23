require 'csv'
require 'json'

games = CSV.parse(File.read('src/db/games.csv', encoding: 'bom|utf-8'), headers: true )

jsonGames = {}
games.each do |row|
    jsonGames[row['id']] = {
        "id": row['id'].to_i,
        "visitor": row['visitor'],
        "home": row['home'],
        "visRuns": row['visRuns'].to_i,
        "visHits": row['visHits'].to_i,
        "visErrors": row['visErrors'].to_i,
        "homeRuns": row['homeRuns'].to_i,
        "homeHits": row['homeHits'].to_i,
        "homeErrors": row['homeErrors'].to_i,
        "winTeam": row['winTeam'],
        "loseTeam": row['loseTeam']
    }
end

File.new("src/db/games.json", "w").puts(jsonGames.to_json)