# Tutorial 18: Networks

# To help organize larger models, you can make Networks inside of the main
# model Network.  
#
# In the graphic interface, the items inside these Networks are not shown
# by default.  If you double-click on a Network you can show (or hide) its
# internals.

# Nengo also comes with a collection of pre-made Networks that can help
# simplify the creation of large models.  For example, the code below uses a
# nengo.networks.EnsembleArray, which is a shortcut for creating a set of
# identical Ensembles.  It also provides a convenient "input" and "output"
# components that let you easily connect to or from all of the Ensembles at
# once.

import numpy as np
import nengo
from nengo.processes import WhiteSignal

def average(a):
    return sum(a)/len(a);


model = nengo.Network()
with model:
    # -- input and pre popluation
    inp = nengo.Node([0.1, 0.2, 0.3, 0.4, 0.5])
    pre = nengo.Ensemble(120, dimensions=5)
    nengo.Connection(inp, pre)
    
    # -- post population
    post = nengo.Ensemble(60, dimensions=1)
    
    stim_a = nengo.Node([0.1, 0.2, 0.3, 0.4, 0.5])
    #stim_b = nengo.Node([0, 0, 0, 0, 0])
    average_ensemble = nengo.Ensemble(n_neurons=100, dimensions=1)
    nengo.Connection(inp, average_ensemble, function=average, synapse=None)
    
    
    # -- error population
    error = nengo.Ensemble(60, dimensions=1)
    nengo.Connection(post, error)
    nengo.Connection(average_ensemble, error, transform=-1)
    
    # -- learning connection
    conn = nengo.Connection(pre, post,
                            function=lambda x: np.random.random(1),
                            learning_rule_type=nengo.PES())
    nengo.Connection(error, conn.learning_rule)
    
    # -- inhibit error after 40 seconds
    inhib = nengo.Node(lambda t: 2.0 if t > 10.0 else 0.0)
    nengo.Connection(inhib, error.neurons, transform=[[-1]] * error.n_neurons)
    
    # -- probes
    average_p = nengo.Probe(average_ensemble, synapse=0.01)
    pre_p = nengo.Probe(pre, synapse=0.01)
    post_p = nengo.Probe(post, synapse=0.01)
    error_p = nengo.Probe(error, synapse=0.03)

#with model:
#    stim_a_probe = nengo.Probe(stim_a, synapse=0.01)
#    average_probe = nengo.Probe(average_ensemble, synapse=0.01)
    
#    sim = nengo.Simulator(model)
#    sim.run(5.0)
    
#    print(sim.data[average_probe][-10:])
    
   # part1 = nengo.Network()
    #with part1:
     #   a = nengo.Ensemble(n_neurons=100, dimensions=5)
        #b = nengo.Ensemble(n_neurons=100, dimensions=5)
      #  c = nengo.Ensemble(n_neurons=300, dimensions=10)
       # nengo.Connection(a, c[:5])
        #nengo.Connection(b, c[5:])
    #nengo.Connection(stim_a, a)
    #nengo.Connection(stim_b, b)
    
    
    #part2 = nengo.networks.EnsembleArray(n_neurons=50, n_ensembles=10)
    
    #nengo.Connection(c, part2.input)
    