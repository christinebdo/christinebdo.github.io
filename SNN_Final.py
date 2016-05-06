#


import numpy as np
import nengo

def optimal(a):
    tieVal = .3 #average clicks human brain starts at
    for i in range(0, 100):
        if (a[i] >= tieVal):
            if tieVal >= .1 or tieVal < 1:
                tieVal = tieVal + .1
        else:
            if tieVal > .1 or tieVal <= 1:
                tieVal = tieVal - .1
    
    return tieVal
    

model = nengo.Network()
with model:
    # -- input and pre popluation
    inp = nengo.Node([0.7, 0.4, 0.4, 0.3, 0.4, 0.3, 0.2, 0.4, 0.5, 0.2, 0.3, 0.3, 
        0.3, 0.2, 0.3, 0.2, 0.2, 0.2, 0.3, 0.4, 0.4, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 
      0.1, 0.2, 0.3, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.5, 0.4, 0.4, 0.5, 0.7, 
      0.6, 0.2, 0.5, 0.5, 0.5, 0.2, 0.4, 0.3, 0.4, 0.3, 0.4, 0.4, 0.4, 0.3, 0.4, 
      0.3, 0.3, 0.4, 0.4, 0.2, 0.3, 0.3, 0.1, 0.4, 0.2, 0.3, 0.1, 0.4, 0.2, 0.4, 
      0.4, 0.1, 0.4, 0.3, 0.3, 0.2, 0.3, 0.3, 0.4, 0.2, 0.1, 0.3, 0.2, 0.2, 0, 
      0.3, 0, 0.1, 0.1, 0.1, 0.3, 0.3, 0, 0.2, 0.1, 0.2, 0.3, 0.4])
    
    
    pre = nengo.Ensemble(500, dimensions=100)
    nengo.Connection(inp, pre)
    
    # -- post population
    post = nengo.Ensemble(60, dimensions=1)
    
    optimal_ensemble = nengo.Ensemble(n_neurons=100, dimensions=1)
    nengo.Connection(inp, optimal_ensemble, function=optimal, synapse=None)
    
    
    
    # -- error population
    error = nengo.Ensemble(60, dimensions=1)
    nengo.Connection(post, error)
    nengo.Connection(optimal_ensemble, error, transform=-1)
    
    # -- learning connection
    conn = nengo.Connection(pre, post,
                            function=lambda x: np.random.random(1),
                            learning_rule_type=nengo.PES())
    nengo.Connection(error, conn.learning_rule)
    
    # -- inhibit error after 10 seconds
    inhib = nengo.Node(lambda t: 2.0 if t > 10.0 else 0.0)
    nengo.Connection(inhib, error.neurons, transform=[[-1]] * error.n_neurons)
    
    # -- probes
    optimal_p = nengo.Probe(optimal_ensemble, synapse=0.01)
    pre_p = nengo.Probe(pre, synapse=0.01)
    post_p = nengo.Probe(post, synapse=0.01)
    error_p = nengo.Probe(error, synapse=0.03)

    
    
    
    
