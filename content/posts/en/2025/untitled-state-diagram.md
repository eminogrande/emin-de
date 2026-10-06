---
title: "Relativity theory as a state diagram"
description: "A Mermaid state diagram of special and general relativity, and how it connects to Newton and quantum gravity. Note to self, make it vertical."
date: "2025-08-28T04:15:01Z"
updated: "2025-08-28T04:15:01Z"
lang: "en"
category: "building"
format: "note"
author: "emin"
provenance: "unknown"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
original_title: ""
cover: "../../../media/untitled-state-diagram/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 87
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts//"
---
Note to myself on this one: make the chart vertical, not horizontal aligned.

It's a state diagram of relativity theory. Special and general relativity, what they are made of, how they replaced Newtonian mechanics, and how the quantum gravity approaches connect to it.

```mermaid
stateDiagram-v2
    direction LR
    state "RelativityTheory" as RelativityTheory {
        [*] --> SpecialRelativity
        [*] --> GeneralRelativity
    }

    state "SpecialRelativity" as SpecialRelativity {
        [*] --> Postulates
        [*] --> MathematicalFramework
        [*] --> KeyConsequences
        [*] --> Applications
        [*] --> ExperimentalTests
        Postulates --> PrincipleOfRelativity
        Postulates --> ConstancyOfLightSpeed
        MathematicalFramework --> LorentzTransformations
        MathematicalFramework --> MinkowskiSpacetime
        MathematicalFramework --> FourVectorsAndTensors
        MathematicalFramework --> RelativisticKinematics
        KeyConsequences --> RelativityOfSimultaneity
        KeyConsequences --> TimeDilation
        KeyConsequences --> LengthContraction
        KeyConsequences --> MassEnergyEquivalence
        KeyConsequences --> RelativisticDopplerEffect
        KeyConsequences --> VelocityAdditionFormula
        Applications --> ParticlePhysics
        Applications --> AcceleratorDesign
        Applications --> Electrodynamics
        Applications --> Astrophysics
        ExperimentalTests --> MichelsonMorley
        ExperimentalTests --> KennedyThorndike
        ExperimentalTests --> IvesStilwell
        ExperimentalTests --> MuonLifetime
        ExperimentalTests --> ParticleAccelerators
        ExperimentalTests --> GPSSystem
    }

    state "GeneralRelativity" as GeneralRelativity {
        [*] --> FoundationalPrinciples
        [*] --> MathematicalStructure
        [*] --> PhysicalPhenomena
        [*] --> CosmologicalImplications
        [*] --> ExtremeGravityObjects
        [*] --> ExperimentalConfirmations
        [*] --> TheoreticalExtensions
        [*] --> OpenProblems
        FoundationalPrinciples --> EquivalencePrinciple
        FoundationalPrinciples --> GeneralCovariance
        MathematicalStructure --> SpacetimeCurvature
        MathematicalStructure --> MetricTensor
        MathematicalStructure --> GeodesicEquation
        MathematicalStructure --> EinsteinFieldEquations
        PhysicalPhenomena --> GravitationalTimeDilation
        PhysicalPhenomena --> LightBending
        PhysicalPhenomena --> GravitationalRedshift
        PhysicalPhenomena --> PerihelionPrecession
        PhysicalPhenomena --> FrameDragging
        PhysicalPhenomena --> GravitationalLensing
        CosmologicalImplications --> ExpandingUniverse
        CosmologicalImplications --> BigBangCosmology
        CosmologicalImplications --> CosmicMicrowaveBackground
        CosmologicalImplications --> DarkEnergy
        CosmologicalImplications --> LargeScaleStructure
        ExtremeGravityObjects --> BlackHoles
        ExtremeGravityObjects --> NeutronStars
        ExtremeGravityObjects --> GravitationalWaves
        ExtremeGravityObjects --> AccretionDisks
        ExtremeGravityObjects --> Jets
        ExperimentalConfirmations --> EddingtonExpedition
        ExperimentalConfirmations --> PoundRebka
        ExperimentalConfirmations --> ShapiroTimeDelay
        ExperimentalConfirmations --> HulseTaylorBinaryPulsar
        ExperimentalConfirmations --> GPSCorrections
        ExperimentalConfirmations --> LIGOVirgo
        ExperimentalConfirmations --> EventHorizonTelescope
        ExperimentalConfirmations --> GRAILMission
        TheoreticalExtensions --> PostNewtonianApproximation
        TheoreticalExtensions --> ParameterizedPPN
        TheoreticalExtensions --> NumericalRelativity
        TheoreticalExtensions --> QuantumGravityApproaches
        OpenProblems --> DarkMatter
        OpenProblems --> BlackHoleInformationParadox
        OpenProblems --> SingularityTheorems
        OpenProblems --> QuantumGravity
    }

    NewtonianMechanics --> SpecialRelativity : superseded by
    NewtonianMechanics --> GeneralRelativity : superseded by
    ClassicalGravity --> NewtonianMechanics : part of
    QuantumMechanics --> StringTheory : related to
    QuantumMechanics --> LoopQuantumGravity : related to
    PostNewtonianApproximation --> SpecialRelativity : related to
    PostNewtonianApproximation --> NewtonianMechanics : related to
    QuantumGravityApproaches --> QuantumMechanics : related to
    QuantumGravityApproaches --> StringTheory : related to
    QuantumGravityApproaches --> LoopQuantumGravity : related to
```

I made it with Mermaid Share. Chart ID chart_1756354351463_48ybl32fi, version 1, created and last updated 8/28/2025, 7:12:31 AM (2025-08-28T04:12:31.464Z created, 2025-08-28T04:12:31.465Z updated). You can [view it live](https://mermaid.emino.app/?chart=chart_1756354351463_48ybl32fi) here https://mermaid.emino.app/?chart=chart_1756354351463_48ybl32fi
