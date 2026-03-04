import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import StressTest from './components/StressTest';
import TimeMachine from './components/TimeMachine';
import AICopilot from './components/AICopilot';
import LifeEvents from './components/LifeEvents';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/app',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'stress-test', Component: StressTest },
      { path: 'time-machine', Component: TimeMachine },
      { path: 'ai-copilot', Component: AICopilot },
      { path: 'life-events', Component: LifeEvents },
    ],
  },
  {
    path: '/dashboard',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
    ],
  },
]);