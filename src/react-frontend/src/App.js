// Copyright 2017 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

//     http://aws.amazon.com/apache2.0/

//  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Authenticator,useAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Header, Menu } from 'semantic-ui-react';

import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, Routes, NavLink, Route } from 'react-router-dom';

import { AlbumList, NewAlbum } from './components/Album';
import { AlbumDetails } from "./components/AlbumDetail";

Amplify.configure(aws_exports);

function App() {
	return (

		<Router>
			<Menu inverted attached>
				<Menu.Item
					name='home'>
					<NavLink to='/'><Header color="yellow">Albums</Header></NavLink>
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Authenticator>
                              {({ signOut, user }) => (
                                <main>
                                  <h1>Hello {user.username}</h1>
                                  <button onClick={signOut}>Sign out</button>
                                </main>
                              )}
                        </Authenticator>
					</Menu.Item>
				</Menu.Menu>
			</Menu>

			<Grid padded>
				<Grid.Column>
					<Routes>
					<Route path="/" exact component={NewAlbum} />
					<Route path="/" exact component={() => !Auth.currentAuthenticatedUser() ? null : <AlbumList />} />
					<Route
						path="/albums/:albumId"
						render={props => <AlbumDetails id={props.match.params.albumId} />} />
					</Routes>
				</Grid.Column>
			</Grid>

		</Router>

	);
}

export default useAuthenticator(App)

