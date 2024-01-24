require 'csv'
require 'json'

# # ===== Add League Year 1 Games to Database ===== #
# ## ========== COMPLETE ========== ##

games = CSV.parse(File.read('src/db/games.csv', encoding: 'bom|utf-8'), headers: true )

jsonGames = []
games.each do |row|
    jsonGames.push({
        "id": row['id'].to_i + 1000,
        "visitor": {
            "team": row['visitor'],
            "runs": row['visRuns'].to_i,
            "hits": row['visHits'].to_i,
            "errors": row['visErrors'].to_i,
        },
        "home": {
            "team": row['home'],
            "runs": row['homeRuns'].to_i,
            "hits": row['homeHits'].to_i,
            "errors": row['homeErrors'].to_i,
        },
        "winner": row['winTeam'],
        "loser": row['loseTeam']
    })
end

File.new("src/db/games.json", "w").puts(jsonGames.to_json)

# # ===== Add HOF Players to Database ===== #
# # ========== COMPLETE ========== ##
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

# # File.new("src/db/hofPlayers.json", "w").puts(jsonHOFPlayers.to_json)

# # ===== Add HOF Players Hitting Cards to Database ===== #
# ## ========== COMPLETE ========== ##
# # hofHitCards = CSV.parse(File.read('src/db/hofHitCards.csv', encoding: 'bom|utf-8'), headers: true)

# # jsonHOFHitCards = {}
# # hofHitCards.each do |row|
# #     firstName = row['first_name']
# #     lastName = row['last_name']

# #     jsonHOFHitCards[row['player_id']] = {
# #         "id": row['player_id'].to_i,
# #         "nameFirst": firstName,
# #         "nameLast": lastName,
# #         "setID": "HOF2014",
# #         "setName": "2014 Hall of Fame",
# #         "battingRecord": {
# #             "avg": row['avg'].to_f,
# #             "ab": row['ab'].to_i,
# #             "do": row['do'].to_i,
# #             "tr": row['tr'].to_i,
# #             "hr": row['hr'].to_i,
# #             "rbi": row['rbi'].to_i,
# #             "bb": row['bb'].to_i,
# #             "so": row['so'].to_i,
# #             "sb": row['sb'].to_i,
# #             "cs": row['cs'].to_i,
# #             "slg": row['slg'].to_f,
# #             "obp": row['obp'].to_f
# #         }
# #     }
# # end

# # File.new("src/db/hofHitCards.json", "w").puts(jsonHOFHitCards.to_json)

# # ===== Add HOF Players Pitching Cards to Database ===== #
# ## ========== COMPLETE ========== ##
# # hofPitchCards = CSV.parse(File.read('src/db/hofPitchCards.csv', encoding: 'bom|utf-8'), headers: true)

# # jsonhofPitchCards = {}
# # hofPitchCards.each do |row|
# #     firstName = row['first_name']
# #     lastName = row['last_name']

# #     jsonhofPitchCards[row['player_id']] = {
# #         "id": row['player_id'].to_i,
# #         "nameFirst": firstName,
# #         "nameLast": lastName,
# #         "setID": "HOF2014",
# #         "setName": "2014 Hall of Fame",
# #         "pitchingRecord": {
# #             "era": row['era'].to_f,
# #             "w": row['w'].to_i,
# #             "l": row['l'].to_i,
# #             "s": row['s'].to_i,
# #             "sv": row['sv'].to_i,
# #             "ip": row['ip'].to_i,
# #             "ha": row['ha'].to_i,
# #             "bb": row['bb'].to_i,
# #             "so": row['so'].to_i,
# #             "hra": row['hra'].to_i
# #         }
# #     }
# # end

# # File.new("src/db/hofPitchCards.json", "w").puts(jsonhofPitchCards.to_json)

# # ===== Add Lineups to Database ===== #
# ## ========== COMPLETE ========== ##
# lineups = CSV.parse(File.read('src/db/lineups.csv', encoding: 'bom|utf-8'), headers: true)

# jsonlineups = {}
# lineups.each do |row|
#     firstName = row['first_name']
#     lastName = row['last_name']
#     player = jsonHOFPlayers.select { |k,v| (v[:nameFirst] === firstName && v[:nameLast] === lastName) }
#     playerID = player.keys[0]
#     puts player[playerID][:nameDisplayRoster]
#     jsonlineups[playerID] = {
#         "playerID": playerID.to_i,
#         "teamID": row['team_id'],
#         "teamName": row['team_name'],
#         "position": row['pos'],
#         "positionID": row['posNum'].to_i,
#         "lineupSpot": row['order'].to_i,
#         "nameDisplayRoster": player[playerID][:nameDisplayRoster]
#     }
# end

# File.new("src/db/lineups.json", "w").puts(jsonlineups.to_json)