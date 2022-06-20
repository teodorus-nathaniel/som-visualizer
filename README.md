# Project Overview
SOM Visualizer is made to help study and understand Self Organizing Map (SOM) by visualizing the training and the neurons' movements.
This project is made using `svelte` with `typescript` and `tailwind`.

## Self Organizing Map
SOM itself is an unsupervised AI Algorithm to cluster data points.  
Each cluster represented by neurons.  
The algorithm simplified step by step:
- Choose a data point
- Get the winner neuron (nearest neuron to the data point)
- Move the neuron and its neighboring neurons closer to the data point
- Repeat

# How to Run
### Development
- `npm run dev`

### Production
- `npm run build`
- `npm start`