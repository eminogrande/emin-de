---
title: "Relativitätstheorie als Zustandsdiagramm"
description: "Ein Mermaid-Zustandsdiagramm der speziellen und allgemeinen Relativitätstheorie und wie sie mit Newton und der Quantengravitation zusammenhängen. Notiz an mich selbst: mach es vertikal."
date: "2025-08-28T04:15:01Z"
updated: "2025-08-28"
lang: de
translated_from: "en/untitled-state-diagram"
source_sections: []
category: building
format: note
author: emin
provenance: unknown
ai_assisted: true
reviewed_by_human: false
image: "/media/untitled-state-diagram/cover.webp"
tldr: ["Ein Mermaid-Zustandsdiagramm der speziellen und allgemeinen Relativitätstheorie, wie sie die Newtonsche Mechanik abgelöst haben und wie die Quantengravitation daran anknüpft."]
---
Notiz an mich selbst: Das Diagramm vertikal machen, nicht horizontal.

Es ist ein Zustandsdiagramm der Relativitätstheorie. Spezielle und allgemeine Relativität, woraus sie bestehen, wie sie die Newtonsche Mechanik ersetzt haben und wie die Ansätze zur Quantengravitation damit zusammenhängen.

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

Ich hab's mit Mermaid Share gemacht. Chart-ID chart_1756354351463_48ybl32fi, Version 1, erstellt und zuletzt aktualisiert am 28.8.2025, 7:12:31 Uhr (2025-08-28T04:12:31.464Z erstellt, 2025-08-28T04:12:31.465Z aktualisiert). Du kannst es dir [hier live ansehen](https://mermaid.emino.app/?chart=chart_1756354351463_48ybl32fi) https://mermaid.emino.app/?chart=chart_1756354351463_48ybl32fi
