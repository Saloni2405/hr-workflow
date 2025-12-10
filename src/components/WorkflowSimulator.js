import React, { useState } from 'react';
import { simulateWorkflow } from '../services/mockApi';
import './WorkflowSimulator.css';

const WorkflowSimulator = ({ nodes, edges }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSimulate = async () => {
    setSimulating(true);
    setError(null);
    setResult(null);

    try {
      const workflowData = {
        nodes: nodes,
        edges: edges
      };

      const simulationResult = await simulateWorkflow(workflowData);
      setResult(simulationResult);
    } catch (err) {
      setError(err);
    } finally {
      setSimulating(false);
    }
  };

  const handleExport = () => {
    const workflowData = {
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target
      }))
    };

    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="simulator-controls">
        <button 
          className="simulate-btn" 
          onClick={() => setIsOpen(true)}
          disabled={nodes.length === 0}
        >
          🧪 Test Workflow
        </button>
        <button 
          className="export-btn" 
          onClick={handleExport}
          disabled={nodes.length === 0}
        >
          💾 Export JSON
        </button>
      </div>

      {isOpen && (
        <div className="simulator-modal">
          <div className="simulator-content">
            <div className="simulator-header">
              <h2>Workflow Simulation</h2>
              <button className="close-modal-btn" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="simulator-body">
              <div className="workflow-summary">
                <h3>Workflow Summary</h3>
                <p><strong>Total Nodes:</strong> {nodes.length}</p>
                <p><strong>Total Connections:</strong> {edges.length}</p>
              </div>

              {!result && !error && (
                <div className="simulation-start">
                  <p>Click the button below to simulate workflow execution</p>
                  <button 
                    className="run-simulation-btn" 
                    onClick={handleSimulate}
                    disabled={simulating}
                  >
                    {simulating ? 'Simulating...' : '▶️ Run Simulation'}
                  </button>
                </div>
              )}

              {error && (
                <div className="simulation-errors">
                  <h3>❌ Validation Errors</h3>
                  <ul>
                    {error.errors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                  <button className="retry-btn" onClick={handleSimulate}>
                    Try Again
                  </button>
                </div>
              )}

              {result && (
                <div className="simulation-results">
                  <h3>✅ Simulation Results</h3>
                  <p className="success-message">{result.message}</p>
                  
                  <div className="execution-steps">
                    <h4>Execution Steps:</h4>
                    {result.steps.map((step, index) => (
                      <div key={index} className="execution-step">
                        <div className="step-number">{step.stepNumber}</div>
                        <div className="step-details">
                          <div className="step-label">{step.label}</div>
                          <div className="step-info">{step.details}</div>
                          <div className="step-status">{step.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="retry-btn" onClick={handleSimulate}>
                    Run Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkflowSimulator;
