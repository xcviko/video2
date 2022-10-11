import React, {useState, useEffect, useRef} from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import mp4 from './assets/1.mp4';
import mp3 from './assets/1.mp3';
import click from './assets/click.mp3';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(false);

	/*useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);
*/
	const [isMuted, setIsMuted] = useState(true);
	const video = useRef(null);
	const audio = useRef(null);
	const audio2 = useRef(null);

	const handleMute = () => {
		audio.current.currentTime = video.current.currentTime;
		audio2.current.play();
		isMuted ? audio.current.play() : audio.current.pause();
		setIsMuted(!isMuted);
	}

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<div id="home" className="componentWrapper" style={{display: 'flex', justifyContent: 'center'}}>
									<div className="component">
										<video ref={video} src={mp4} autoPlay loop muted playsInline/>
										<audio ref={audio} loop preload="auto" src={mp3}></audio>
										<audio ref={audio2} preload="auto" src={click}></audio>
										<div className="buttonWrapper" style={{display: 'flex', justifyContent: 'center'}}>
											<button onClick={handleMute} style={{width: '80px'}}>
												{isMuted ? 'unmute' : 'mute'}
											</button>
										</div>
									</div>
								</div>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
