# ===== COMPLETE ===== #
# --- SEED WSOB TEAMS --- #
# require_relative './seeds/teams/seed_teams.rb'
# seed_teams('./seeds/teams/wsob-teams.csv')

# ===== COMPLETE ===== #
# --- SEED WSOB 2024 GAMES --- #
# require_relative './seeds/games/seed_games.rb'
# seed_games('./seeds/games/wsob2024-games.csv', 'wsob2024')
# update_games('./seeds/games/wsob2024-games.csv')

# --- SEED PLAYERS --- #
require_relative './seeds/players/seed_players.rb'
seed_players('./seeds/players/combinedPlayerData.csv')