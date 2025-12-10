import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';

export const StartNode = ({ data, selected }) => {
  return (
    <div className={`custom-node start-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <span className="node-icon"></span>
        <span className="node-type">Start</span>
      </div>
      <div className="node-content">
        <div className="node-title">{data.title || 'Start Workflow'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const TaskNode = ({ data, selected }) => {
  return (
    <div className={`custom-node task-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon"></span>
        <span className="node-type">Task</span>
      </div>
      <div className="node-content">
        <div className="node-title">{data.title || 'Untitled Task'}</div>
        {data.assignee && (
          <div className="node-detail">👤 {data.assignee}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const ApprovalNode = ({ data, selected }) => {
  return (
    <div className={`custom-node approval-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon"></span>
        <span className="node-type">Approval</span>
      </div>
      <div className="node-content">
        <div className="node-title">{data.title || 'Approval Required'}</div>
        {data.approverRole && (
          <div className="node-detail">👔 {data.approverRole}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const AutomatedNode = ({ data, selected }) => {
  return (
    <div className={`custom-node automated-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon"></span>
        <span className="node-type">Automated</span>
      </div>
      <div className="node-content">
        <div className="node-title">{data.title || 'Automated Action'}</div>
        {data.actionLabel && (
          <div className="node-detail">🤖 {data.actionLabel}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const EndNode = ({ data, selected }) => {
  return (
    <div className={`custom-node end-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon"></span>
        <span className="node-type">End</span>
      </div>
      <div className="node-content">
        <div className="node-title">{data.endMessage || 'End Workflow'}</div>
      </div>
    </div>
  );
};
