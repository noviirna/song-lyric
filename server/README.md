# Song Lyric
## Route List :

#### User route

Route | HTTP | Header(s) | Body | Description
----- | ---- | --------- | ---- | -----------
/user/register | POST | none | email: string (**required**), password: string (**required**) | Register new user
/user/login | POST | none | email: string (**required**), password: string (**required**) | Login / acquire new token
/user/logingoogle| POST| idToken: string(**required**)| none | Register/login using google account


#### Third party route

Route | HTTP | Header(s) | Body | Params | Description
----- | ---- | --------- | ---- | ------- | ----
/3rdparty/findbyparam | GET | token: string (**required**) | none | artist: string(**required**), song: string(**optional**)  | search album or song name
/3rdparty/tracklist | GET | token: string (**required**) | idAlbum: number(**required**) | none | List all song from an album
/3rdparty/lyric/:artist/:title| GET | token: string (**required**) | none | none | get lyrics from an artist by his/her song
/translate | POST | token: string (**required**) | none | none | Translate lyric onto other languange

#### Track Api
Route | HTTP | Header(s) | Body | Params | Description
----- | ---- | --------- | ---- | ------- | ----
/tracks| GET | token: string (**required**) | none | none  | List all users favorite song
/tracks | POST | token: string (**required**) | userId: objectId(**required**), strAlbum: string(**required**),  strAlbumThumb: string(**required**), strTrack: string(**required**), strArtist: string(**required**) | none | create new favorite
/tracks/:id | DELETE | token: string (**required**) | none | none | delete song from user favorite list


## Usage
Make sure you have node.js and  npm installed on your computer, and then run these commands:

> $ npm install

> $ npm run dev 

> $ npm start