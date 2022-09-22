// Copyright 2017 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

//     http://aws.amazon.com/apache2.0/

//  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Header, Menu } from 'semantic-ui-react';

import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, Routes, NavLink, Route, useParams} from 'react-router-dom';

import { AlbumList, NewAlbum } from './components/Album';
import { AlbumDetails } from "./components/AlbumDetail";

Amplify.configure(aws_exports);

function App({ signOut, user }) {
	return (
		<Router>
			<Menu inverted attached>
				<Menu.Item
					name='home'>
					<NavLink to='/'><Header color="yellow">Albums</Header></NavLink>
				</Menu.Item>
				<Menu.Item
					name='myalbums'>
					<NavLink to='/albums'><Header color="yellow">MyAlbums</Header></NavLink>
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<>
							<main>
							  <h1>Hello {user.username}</h1>
							  <button onClick={signOut}>Sign out</button>
							</main>
						</>
					</Menu.Item>
				</Menu.Menu>
			</Menu>

			<Routes>
				<Route path="/"  element={<NewAlbum/>} />
				<Route path="/albums" element={<AlbumList/>} />
				<Route path="/albums/:albumId" element={<OpenAlbum/>} />
			</Routes>
		</Router>
	);
}
export default withAuthenticator(App);

function OpenAlbum() {
  let params = useParams();
  return <AlbumDetails id={params.albumId} />;
}
