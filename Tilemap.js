class Tilemap {

	constructor(tilesize, textures={}) {

		this.tilesize = tilesize;
		this.textures = textures;

		this.tiles = [];

	}

	setTile(x, y, tile) {

		if (this.tiles.length == 1) {
		
			if (this.tiles[0][0] < x || (this.tiles[0][0] == x && this.tiles[0][1] < y)) {

				this.tiles.push([x, y, tile]);
				
			} else {

				this.tiles.shift([x, y, tile]);

			}

		}
		
		//Binary search go brrrr

		let minI = 0;
		let maxI = this.tiles.length;

		while (maxI - minI > 1) {
			
			let searchI = Math.ceil((minI + maxI) / 2);

			if (this.tiles[searchI][0] == x && this.tiles[searchI][1] == y) {

				//Special case: this tile needs to be overwritten
				minI = searchI;
				maxI = searchI;
				this.tiles.splice(searchI, 1);

			} else if (this.tiles[searchI][0] < x || (this.tiles[searchI][0] == x && this.tiles[searchI][1] < y)) {
				
				minI = searchI;

			} else {

				maxI = searchI;

			}

		}

		this.tiles.splice(maxI, 0, [x, y, tile]);

	}

	getTile(x, y) {
		
		let minI = 0;
		let maxI = this.tiles.length;

		while (maxI - minI > 1) {

			let searchI = Math.ceil((minI + maxI) / 2);

			if (this.tiles[searchI][0] == x && this.tiles[searchI][1] == y) {

				return this.tiles[searchI][2];

			} else if (this.tiles[searchI][0] < x || (this.tiles[searchI][0] == x && this.tiles[searchI][1] < y)) {

				minI = searchI;

			} else {

				maxI = searchI;

			}

		}

		if (this.tiles[maxI][0] == x && this.tiles[maxI][1] == y) {

			return this.tiles[maxI][2];

		}

		return null;

	}

	render(canvas, x, y) {
		
		let context = canvas.getContext("2d");

		for (let tile of this.tiles) {
			
			let tileX = tile[0];
			let tileY = tile[1];
			let texture = this.textures[tile[2]];
			
			context.drawImage(texture, x + tileX*this.tilesize, y + tileY*this.tilesize, this.tilesize, this.tilesize);

		}

	}

}

export { Tilemap };
