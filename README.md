# HR Workflow Designer Module

A visual workflow designer built with React and React Flow that allows HR admins to create, configure, and test internal workflows such as onboarding, leave approval, and document verification.

## Features

- **Visual Workflow Canvas**: Drag-and-drop interface powered by React Flow
- **5 Custom Node Types**:
  - Start Node - Workflow entry point
  - Task Node - Human tasks (e.g., collect documents)
  - Approval Node - Manager or HR approval steps
  - Automated Node - System-triggered actions (e.g., send email, generate PDF)
  - End Node - Workflow completion
- **Dynamic Configuration Forms**: Edit each node with type-specific forms
- **Mock API Integration**: Simulates automated actions and workflow execution
- **Workflow Simulation**: Test and validate workflows with step-by-step execution
- **Export/Import**: Download workflows as JSON
- **Visual Validation**: Real-time validation with error messages

## Architecture

### Folder Structure

```
hr-workflow/
├── src/
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── CustomNodes.js      # 5 custom node components
│   │   │   └── NodeStyles.css      # Node styling
│   │   ├── NodeEditPanel.js        # Dynamic configuration forms
│   │   ├── NodeEditPanel.css
│   │   ├── WorkflowSimulator.js    # Simulation & testing panel
│   │   └── WorkflowSimulator.css
│   ├── services/
│   │   └── mockApi.js              # Mock API layer
│   ├── App.js                      # Main application component
│   ├── App.css                     # Main styling
│   └── index.js                    # Entry point
├── public/
└── package.json
```

### Key Components

1. **App.js** - Main application managing workflow state and React Flow canvas
2. **CustomNodes.js** - 5 custom node components with specific styling
3. **NodeEditPanel.js** - Dynamic configuration forms for each node type
4. **WorkflowSimulator.js** - Testing panel with validation and execution simulation
5. **mockApi.js** - Mock API layer with validation and cycle detection

## Usage

### Creating a Workflow

1. **Add Nodes**: Drag node types from the sidebar onto the canvas
2. **Connect Nodes**: Click and drag from a node's handle to another node
3. **Configure Nodes**: Click a node to open the edit panel and fill in details
4. **Save Changes**: Click "Save Changes" in the edit panel

### Testing Workflows

1. Click the **"Test Workflow"** button in the header
2. Review workflow summary
3. Click **"Run Simulation"**
4. View execution steps and validation results

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

## 🔧 Design Decisions

### Why React Flow?
- Production-ready graph visualization library with built-in features
- Excellent performance and TypeScript support
- Active community and documentation

### State Management
- Used React's built-in hooks (`useState`, `useCallback`)
- React Flow's `useNodesState` and `useEdgesState` for optimal performance
- No external state management needed for this scope

### Styling Approach
- Simple CSS files for easier understanding
- Component-specific CSS for modularity
- Consistent color scheme for different node types

### Mock API Design
- Promise-based async functions with realistic delays
- Proper validation and error handling
- Extensible structure for adding more endpoints

## Validation Features

The simulator validates:
- ✓ Presence of Start Node
- ✓ Presence of End Node
- ✓ Disconnected nodes detection
- ✓ Cycle detection (prevents infinite loops)

## Future Enhancements

With more time, these features could be added:

1. **Persistence**: LocalStorage or backend integration
2. **Import Workflow**: Upload JSON files
3. **Undo/Redo**: History management
4. **Node Templates**: Predefined workflow patterns
5. **Conditional Branches**: If/else logic in workflows
6. **Advanced Validation**: More complex business rules
7. **Auto-layout**: Automatic node positioning

## Assumptions

1. **No Backend**: All data is client-side only
2. **Single User**: No concurrent editing considerations
3. **Simple Validation**: Basic graph validation
4. **Mock Data**: API responses are simulated
5. **Desktop First**: Optimized for desktop browsers

---

**Built with ❤️ using React and React Flow**
