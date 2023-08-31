const Pool = require('./config/db');

class PlaylistSongsService {
  constructor() {
    this._pool = Pool;
  }

  async getPlaylistsById(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const { rows } = await this._pool.query(query);

    return rows[0];
  }

  async getPlaylistSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const { rows } = await this._pool.query(query);

    return rows;
  }
}

module.exports = PlaylistSongsService;
