require 'csv'
require 'pg'

def seed_games(gamesCSV, seasonId)

  puts "SEEDING GAMES..."

  conn = PG.connect("postgres://nhppuxta:gV757NwEvUfBrO7zkGnuNDvZUmtpUUpc@otto.db.elephantsql.com/nhppuxta")

  CSV.foreach(gamesCSV, headers: true) do |game|
    final = game['winTeam'] != nil
    firestore_ref = "seasons/#{seasonId}/games/#{game['id']}"
    conn.exec_params(
      "INSERT INTO games 
      (season_id, game_number, visitor, home, visitor_runs, visitor_hits, visitor_errors, home_runs, home_hits, home_errors, winner, loser, final, firestore_ref)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", 
      [seasonId, game['id'], game['visitor'], game['home'], game['visRuns'], game['visHits'], game['visErrors'], game['homeRuns'], game['homeHits'], game['homeErrors'], game['winTeam'], game['loseTeam'], final, firestore_ref]
    )
  end

  conn.close

end


def update_games(gamesCSV)

  puts "UPDATING GAMES..."

  conn = PG.connect("postgres://nhppuxta:gV757NwEvUfBrO7zkGnuNDvZUmtpUUpc@otto.db.elephantsql.com/nhppuxta")

  CSV.foreach(gamesCSV, headers: true) do |game|

    home_wins, home_losses, visitor_wins, visitor_losses = [0,0,0,0]

    CSV.foreach(gamesCSV, headers: true) do |g|
      if g['id'] <= game['id']
        if game['home'] === g['winTeam']
          home_wins +=1 
        end
        if game['home'] === g['loseTeam']
          home_losses += 1
        end
        if game['visitor'] === g['winTeam']
          visitor_wins += 1
        end
        if game['visitor'] === g['loseTeam']
          visitor_losses += 1
        end
      end
    end

    update_string = """
      UPDATE games
      SET home_wins = #{home_wins},
          home_losses = #{home_losses},
          visitor_wins = #{visitor_wins},
          visitor_losses = #{visitor_losses}
      WHERE id = #{game['id']}
    """
    conn.exec_params(update_string)
  end

  conn.close

end