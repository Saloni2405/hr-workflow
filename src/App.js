import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from './components/nodes/CustomNodes';
import NodeEditPanel from './components/NodeEditPanel';
import WorkflowSimulator from './components/WorkflowSimulator';
import './App.css';

// Define custom node types
const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};

// Node templates for the sidebar
const nodeTemplates = [
  { type: 'startNode', label: 'Start', color: '#2196F3' },
  { type: 'taskNode', label: 'Task', color: '#FF9800' },
  { type: 'approvalNode', label: 'Approval', color: '#4CAF50' },
  { type: 'automatedNode', label: 'Automated', color: '#9C27B0' },
  { type: 'endNode', label: 'End', color: '#F44336' },
];

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Handle edge connection
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // Handle canvas click (deselect)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Add new node from sidebar
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const reactFlowBounds = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { 
          label: `New ${type.replace('Node', '')}`,
          title: '',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Update node data
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: newData,
            };
          }
          return node;
        })
      );
      // Update selected node
      setSelectedNode((sel) => {
        if (sel && sel.id === nodeId) {
          return { ...sel, data: newData };
        }
        return sel;
      });
    },
    [setNodes]
  );

  // Delete selected elements
  const onNodesDelete = useCallback(() => {
    if (selectedNode) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>HR Workflow Designer</h1>
          <p>Design and test your HR workflows visually</p>
        </div>
        <WorkflowSimulator nodes={nodes} edges={edges} />
      </header>

      <div className="main-content">
        {/* Sidebar with node templates */}
        <aside className="sidebar">
          <h3>Node Types</h3>
          <p className="sidebar-hint">Drag nodes to the canvas</p>
          <div className="node-templates">
            {nodeTemplates.map((template) => (
              <div
                key={template.type}
                className="node-template"
                draggable
                onDragStart={(e) => onDragStart(e, template.type)}
                style={{ borderLeftColor: template.color }}
              >
                <span className="template-icon">{template.icon}</span>
                <span className="template-label">{template.label}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-info">
            <h4>Instructions</h4>
            <ul>
              <li>Drag nodes onto the canvas</li>
              <li>Click a node to edit it</li>
              <li>Connect nodes by dragging from one handle to another</li>
              <li>Press Delete to remove selected items</li>
              <li>Use Test Workflow to simulate execution</li>
            </ul>
          </div>
        </aside>

        {/* React Flow Canvas */}
        <div className="canvas-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                const template = nodeTemplates.find(t => t.type === node.type);
                return template ? template.color : '#999';
              }}
            />
          </ReactFlow>
        </div>

        {/* Node Edit Panel */}
        <NodeEditPanel
          selectedNode={selectedNode}
          onUpdateNode={updateNodeData}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}

export default App;
