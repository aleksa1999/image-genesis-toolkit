
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Load Checkpoint' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'CLIP Text Encode (Prompt)' },
    position: { x: 300, y: 50 },
  },
  {
    id: '3',
    type: 'default',
    data: { label: 'CLIP Text Encode (Negative)' },
    position: { x: 300, y: 150 },
  },
  {
    id: '4',
    type: 'default',
    data: { label: 'KSampler' },
    position: { x: 500, y: 100 },
  },
  {
    id: '5',
    type: 'default',
    data: { label: 'VAE Decode' },
    position: { x: 700, y: 100 },
  },
  {
    id: '6',
    type: 'default',
    data: { label: 'Save Image' },
    position: { x: 900, y: 100 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
];

const Graph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">ComfyUI Graph Visualization</h1>
        <p className="text-gray-400 mb-4">Read-only visualization of the ComfyUI workflow graph</p>
      </div>
      
      <div className="h-[calc(100vh-160px)] bg-gray-800 border border-gray-700 mx-6 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          fitView
          className="rounded-lg"
        >
          <Controls className="bg-gray-700 border-gray-600" />
          <Background color="#374151" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Graph;
