// Simple mock API service for automations and workflow simulation

// Mock automated actions
const mockAutomations = [
  { 
    id: "send_email", 
    label: "Send Email", 
    params: ["to", "subject", "body"] 
  },
  { 
    id: "generate_doc", 
    label: "Generate Document", 
    params: ["template", "recipient"] 
  },
  { 
    id: "create_ticket", 
    label: "Create Ticket", 
    params: ["title", "priority"] 
  },
  { 
    id: "notify_slack", 
    label: "Notify Slack", 
    params: ["channel", "message"] 
  }
];

// GET /automations - Returns available automated actions
export const getAutomations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations);
    }, 300);
  });
};

// POST /simulate - Simulates workflow execution
export const simulateWorkflow = (workflowData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { nodes, edges } = workflowData;
      
      // Validate workflow structure
      const errors = validateWorkflow(nodes, edges);
      if (errors.length > 0) {
        reject({ errors });
        return;
      }

      // Generate execution steps
      const steps = generateExecutionSteps(nodes, edges);
      resolve({ 
        success: true, 
        steps,
        message: "Workflow simulation completed successfully" 
      });
    }, 500);
  });
};

// Validate workflow structure
const validateWorkflow = (nodes, edges) => {
  const errors = [];

  // Check if there's a Start node
  const startNode = nodes.find(n => n.type === 'startNode');
  if (!startNode) {
    errors.push("Workflow must have a Start Node");
  }

  // Check if there's an End node
  const endNode = nodes.find(n => n.type === 'endNode');
  if (!endNode) {
    errors.push("Workflow must have an End Node");
  }

  // Check for disconnected nodes
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const disconnectedNodes = nodes.filter(n => !connectedNodeIds.has(n.id));
  if (disconnectedNodes.length > 0 && nodes.length > 1) {
    errors.push(`Disconnected nodes found: ${disconnectedNodes.map(n => n.data.label || n.id).join(', ')}`);
  }

  // Check for cycles (basic check)
  if (hasCycle(nodes, edges)) {
    errors.push("Workflow contains cycles - infinite loops detected");
  }

  return errors;
};

// Simple cycle detection
const hasCycle = (nodes, edges) => {
  const graph = {};
  nodes.forEach(node => {
    graph[node.id] = [];
  });
  
  edges.forEach(edge => {
    graph[edge.source].push(edge.target);
  });

  const visited = new Set();
  const recStack = new Set();

  const detectCycle = (nodeId) => {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = graph[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (detectCycle(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const nodeId in graph) {
    if (!visited.has(nodeId)) {
      if (detectCycle(nodeId)) return true;
    }
  }

  return false;
};

// Generate execution steps from workflow
const generateExecutionSteps = (nodes, edges) => {
  const steps = [];
  
  // Find start node
  const startNode = nodes.find(n => n.type === 'startNode');
  if (!startNode) return steps;

  // Build adjacency list
  const graph = {};
  edges.forEach(edge => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge.target);
  });

  // Traverse workflow
  const visited = new Set();
  const traverse = (nodeId, stepNumber) => {
    if (visited.has(nodeId)) return stepNumber;
    visited.add(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return stepNumber;

    const step = {
      stepNumber,
      nodeId: node.id,
      nodeType: node.type,
      label: node.data.label || 'Unnamed Step',
      status: 'completed',
      details: generateStepDetails(node)
    };

    steps.push(step);

    // Process next nodes
    const nextNodes = graph[nodeId] || [];
    let currentStep = stepNumber;
    nextNodes.forEach(nextId => {
      currentStep = traverse(nextId, currentStep + 1);
    });

    return currentStep;
  };

  traverse(startNode.id, 1);

  return steps;
};

// Generate details for each step
const generateStepDetails = (node) => {
  switch (node.type) {
    case 'startNode':
      return `Starting workflow: ${node.data.title || 'Untitled Workflow'}`;
    
    case 'taskNode':
      return `Task assigned to ${node.data.assignee || 'Unassigned'}: ${node.data.title || 'Untitled Task'}`;
    
    case 'approvalNode':
      return `Approval required from ${node.data.approverRole || 'Unknown'}: ${node.data.title || 'Untitled Approval'}`;
    
    case 'automatedNode':
      return `Automated action: ${node.data.actionLabel || node.data.action || 'No action selected'}`;
    
    case 'endNode':
      return `Workflow completed: ${node.data.endMessage || 'End of workflow'}`;
    
    default:
      return `Executing step: ${node.data.label || 'Unknown'}`;
  }
};
