const StaffData = Object.freeze({
    ADMIN: {
        id: '00000000-0000-4000-8000-000000000000',
        username: 'admin',
        password: '123456'
    }
});

const SlotState = Object.freeze({       // for changing 'Slot State'
    EMPTY: {
        id: '744066fd-4ae4-4967-9011-2c51afb139a0',
        name: 'empty',
        description: null
    },
    OCCUPIED: {
        id: '93e6b97f-687a-491e-b0a6-6013cc5a2848',
        name: 'occupied',
        description: null
    }
});

const Category = Object.freeze({        // for selecting plant type's 'Category'
    INDOOR: {
        id: '47a2cf72-c89f-4ba9-8f0e-3943bd0c5132',
        name: 'indoor',
        description: null
    },
    OUTDOOR: {
        id: 'c559fc61-6e3a-4f72-9a0e-bd6faeb25d58',
        name: 'outdoor',
        description: null
    }
});

const PresetIntensity = Object.freeze({
    DIRECT: {
        id: '22927165-ed75-46f7-bb84-a0b898bd8d14',
        name: 'Direct',
        description: null
    },
    INDIRECT: {
        id: 'b42a6afa-dca8-4ee6-bf41-2cf4710e12b2',
        name: 'Indirect',
        description: null
    }
});

const PresetLighting = Object.freeze({
    FULL_SUN: {
        id: '4479123b-df0c-4bf8-b5d6-49c2a27978cd',
        name: 'Full Sun',
        description: 'at least 6 hours / day'
    },
    PARTIAL_SUN: {
        id: '8e9259d6-230d-43ee-8313-180ecbcf3fcd',
        name: 'Partial Sun',
        description: '3 - 6 hours / day'
    },
    PARTIAL_SHADE: {
        id: '9adf7269-ff25-4bf6-ad00-aa05ada7e249',
        name: 'Partial Shade',
        description: '3 - 6 hours / day'
    },
    LOW_LIGHT: {
        id: 'f4d11729-d404-4936-8c80-821bcc64e8d8',
        name: 'Low Light',
        description: '2 - 3 hours / day'
    }
});

const Preset = Object.freeze({      // 'Plant Caring' choice selection
    FULL_SUN: {
        id: '3f7ad8d9-0c56-4132-9b10-5d92524cd400',
        intensity_id: '22927165-ed75-46f7-bb84-a0b898bd8d14',   // Direct
        lighting_id: '4479123b-df0c-4bf8-b5d6-49c2a27978cd'     // Full Sun
    },
    PARTIAL_SUN: {
        id: '50f89657-cc40-44bd-97b8-256e580cf289',
        intensity_id: '22927165-ed75-46f7-bb84-a0b898bd8d14',   // Direct
        lighting_id: '8e9259d6-230d-43ee-8313-180ecbcf3fcd'     // Partial Sun
    },
    PARTIAL_SHADE: {
        id: '97007e9d-54d3-4a12-91f5-96c7a19daecb',
        intensity_id: 'b42a6afa-dca8-4ee6-bf41-2cf4710e12b2',   // Indirect
        lighting_id: '9adf7269-ff25-4bf6-ad00-aa05ada7e249'     // Partial Shade
    },
    LOW_LIGHT: {
        id: 'd780544a-ab05-4490-8342-e6badbfbc171',
        intensity_id: 'b42a6afa-dca8-4ee6-bf41-2cf4710e12b2',   // Indirect
        lighting_id: 'f4d11729-d404-4936-8c80-821bcc64e8d8'     // Low Light
    }
});

module.exports = {
    StaffData,
    SlotState,
    Category,
    PresetIntensity,
    PresetLighting,
    Preset
};
