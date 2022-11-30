require 'csv'
require 'json'

# ===== Add League Year 1 Games to Database ===== #
## ========== COMPLETE ========== ##

# games = CSV.parse(File.read('src/db/games.csv', encoding: 'bom|utf-8'), headers: true )

# jsonGames = {}
# games.each do |row|
#     jsonGames[row['id']] = {
#         "id": row['id'].to_i,
#         "visitor": row['visitor'],
#         "home": row['home'],
#         "visRuns": row['visRuns'].to_i,
#         "visHits": row['visHits'].to_i,
#         "visErrors": row['visErrors'].to_i,
#         "homeRuns": row['homeRuns'].to_i,
#         "homeHits": row['homeHits'].to_i,
#         "homeErrors": row['homeErrors'].to_i,
#         "winTeam": row['winTeam'],
#         "loseTeam": row['loseTeam']
#     }
# end

# File.new("src/db/games.json", "w").puts(jsonGames.to_json)

# ===== Add HOF Players to Database ===== #
## ========== COMPLETE ========== ##
# hofPlayers = CSV.parse(File.read('src/db/hofPlayers.csv', encoding: 'bom|utf-8'), headers: true)

# jsonHOFPlayers = {}
# hofPlayers.each do |row|
#     firstName = row['first_name']
#     lastName = row['last_name']

#     jsonHOFPlayers[row['player_id']] = {
#         "id": row['player_id'].to_i,
#         "nameFirst": firstName,
#         "nameLast": lastName,
#         "nameDisplayFirstLast": "#{firstName} #{lastName}",
#         "nameDisplayLastFirst": "#{lastName}, #{firstName}",
#         "nameDisplayRoster": "#{lastName}, #{firstName[0]}"
#     }
# end

# File.new("src/db/hofPlayers.json", "w").puts(jsonHOFPlayers.to_json)