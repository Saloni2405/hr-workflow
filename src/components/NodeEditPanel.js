import React, { useState, useEffect } from 'react';
import { getAutomations } from '../services/mockApi';
import './NodeEditPanel.css';

const NodeEditPanel = ({ selectedNode, onUpdateNode, onClose }) => {
  if (!selectedNode) {
    return (
      <div className="edit-panel">
        <div className="edit-panel-empty">
          <p>Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-panel">
      <div className="edit-panel-header">
        <h3>Edit Node</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="edit-panel-content">
        {selectedNode.type === 'startNode' && (
          <StartNodeForm node={selectedNode} onUpdate={onUpdateNode} />
        )}
        {selectedNode.type === 'taskNode' && (
          <TaskNodeForm node={selectedNode} onUpdate={onUpdateNode} />
        )}
        {selectedNode.type === 'approvalNode' && (
          <ApprovalNodeForm node={selectedNode} onUpdate={onUpdateNode} />
        )}
        {selectedNode.type === 'automatedNode' && (
          <AutomatedNodeForm node={selectedNode} onUpdate={onUpdateNode} />
        )}
        {selectedNode.type === 'endNode' && (
          <EndNodeForm node={selectedNode} onUpdate={onUpdateNode} />
        )}
      </div>
    </div>
  );
};

// Start Node Form
const StartNodeForm = ({ node, onUpdate }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [metadata, setMetadata] = useState(node.data.metadata || []);

  const handleSave = () => {
    onUpdate(node.id, {
      ...node.data,
      title,
      metadata,
      label: title
    });
  };

  const addMetadata = () => {
    setMetadata([...metadata, { key: '', value: '' }]);
  };

  const updateMetadata = (index, field, value) => {
    const newMetadata = [...metadata];
    newMetadata[index][field] = value;
    setMetadata(newMetadata);
  };

  const removeMetadata = (index) => {
    setMetadata(metadata.filter((_, i) => i !== index));
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter workflow title"
        />
      </div>

      <div className="form-group">
        <label>Metadata (Optional)</label>
        {metadata.map((item, index) => (
          <div key={index} className="metadata-row">
            <input
              type="text"
              placeholder="Key"
              value={item.key}
              onChange={(e) => updateMetadata(index, 'key', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={item.value}
              onChange={(e) => updateMetadata(index, 'value', e.target.value)}
            />
            <button onClick={() => removeMetadata(index)} className="remove-btn">×</button>
          </div>
        ))}
        <button onClick={addMetadata} className="add-btn">+ Add Metadata</button>
      </div>

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

// Task Node Form
const TaskNodeForm = ({ node, onUpdate }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [description, setDescription] = useState(node.data.description || '');
  const [assignee, setAssignee] = useState(node.data.assignee || '');
  const [dueDate, setDueDate] = useState(node.data.dueDate || '');
  const [customFields, setCustomFields] = useState(node.data.customFields || []);

  const handleSave = () => {
    onUpdate(node.id, {
      ...node.data,
      title,
      description,
      assignee,
      dueDate,
      customFields,
      label: title
    });
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const updateCustomField = (index, field, value) => {
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
  };

  const removeCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Assignee</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Enter assignee name"
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Custom Fields</label>
        {customFields.map((field, index) => (
          <div key={index} className="metadata-row">
            <input
              type="text"
              placeholder="Field Name"
              value={field.key}
              onChange={(e) => updateCustomField(index, 'key', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
            />
            <button onClick={() => removeCustomField(index)} className="remove-btn">×</button>
          </div>
        ))}
        <button onClick={addCustomField} className="add-btn">+ Add Field</button>
      </div>

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

// Approval Node Form
const ApprovalNodeForm = ({ node, onUpdate }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [approverRole, setApproverRole] = useState(node.data.approverRole || '');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(node.data.autoApproveThreshold || '');

  const handleSave = () => {
    onUpdate(node.id, {
      ...node.data,
      title,
      approverRole,
      autoApproveThreshold,
      label: title
    });
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter approval title"
        />
      </div>

      <div className="form-group">
        <label>Approver Role</label>
        <select value={approverRole} onChange={(e) => setApproverRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="CEO">CEO</option>
        </select>
      </div>

      <div className="form-group">
        <label>Auto-Approve Threshold</label>
        <input
          type="number"
          value={autoApproveThreshold}
          onChange={(e) => setAutoApproveThreshold(e.target.value)}
          placeholder="Enter threshold amount"
        />
      </div>

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

// Automated Node Form
const AutomatedNodeForm = ({ node, onUpdate }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [action, setAction] = useState(node.data.action || '');
  const [actionParams, setActionParams] = useState(node.data.actionParams || {});
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAutomations().then(data => {
      setAutomations(data);
      setLoading(false);
    });
  }, []);

  const selectedAutomation = automations.find(a => a.id === action);

  const handleSave = () => {
    const automation = automations.find(a => a.id === action);
    onUpdate(node.id, {
      ...node.data,
      title,
      action,
      actionLabel: automation?.label,
      actionParams,
      label: title
    });
  };

  const updateParam = (param, value) => {
    setActionParams({
      ...actionParams,
      [param]: value
    });
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter action title"
        />
      </div>

      <div className="form-group">
        <label>Action Type</label>
        {loading ? (
          <p>Loading actions...</p>
        ) : (
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">Select an action</option>
            {automations.map(auto => (
              <option key={auto.id} value={auto.id}>{auto.label}</option>
            ))}
          </select>
        )}
      </div>

      {selectedAutomation && selectedAutomation.params && (
        <div className="form-group">
          <label>Action Parameters</label>
          {selectedAutomation.params.map(param => (
            <div key={param} className="param-input">
              <label>{param}</label>
              <input
                type="text"
                value={actionParams[param] || ''}
                onChange={(e) => updateParam(param, e.target.value)}
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

// End Node Form
const EndNodeForm = ({ node, onUpdate }) => {
  const [endMessage, setEndMessage] = useState(node.data.endMessage || '');
  const [showSummary, setShowSummary] = useState(node.data.showSummary || false);

  const handleSave = () => {
    onUpdate(node.id, {
      ...node.data,
      endMessage,
      showSummary,
      label: endMessage
    });
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label>End Message</label>
        <textarea
          value={endMessage}
          onChange={(e) => setEndMessage(e.target.value)}
          placeholder="Enter workflow end message"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showSummary}
            onChange={(e) => setShowSummary(e.target.checked)}
          />
          Show Summary
        </label>
      </div>

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

export default NodeEditPanel;
