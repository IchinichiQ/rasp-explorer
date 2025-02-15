import styled, {useTheme} from 'styled-components';
import language from 'language.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {setSettings, Theme, useSettings} from 'store/settingsSlice';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch} from 'store';

const StyledHeader = styled.header<{ isPWA: boolean }>`
  background-color: ${props => props.theme.secondaryBgColor};
  margin-bottom: 20px;
  position: ${props => (props.isPWA ? 'sticky' : 'static')};
  top: ${props => (props.isPWA ? '0' : 'auto')};
  z-index: ${props => (props.isPWA ? '1000' : 'auto')};
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const StyledHeaderBody = styled.div`
  padding-block: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    padding-block: 10px;
    font-size: .7rem;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;

function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

const Header = () => {
    const { theme } = useSettings();
    const styledTheme = useTheme();
    const dispatch = useAppDispatch();
    const isInPWA = isPWA();

    return (
        <StyledHeader isPWA={isInPWA}>
            <div className="container">
                <StyledHeaderBody>
                    <h1>{language.title}</h1>
                    <StyledIcon
                        onClick={() => dispatch(setSettings({ theme: theme === Theme.Light ? Theme.Dark : Theme.Light }))}
                        icon={theme === Theme.Light ? faMoon : faSun}
                    />
                </StyledHeaderBody>
            </div>
        </StyledHeader>
    );
};

export default Header;