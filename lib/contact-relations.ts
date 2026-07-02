import {
    Users,
    Heart,
    User,
    Briefcase,
    Home
} from "lucide-react";

import type { RelationType } from "@/lib/types/relations";

export const relationMap = {
    PARENT: {
        icon: Home,
        label: "Parent",
    },

    SPOUSE: {
        icon: Heart,
        label: "Spouse",
    },

    SIBLING: {
        icon: Users,
        label: "Sibling",
    },

    FRIEND: {
        icon: User,
        label: "Friend",
    },

    COLLEAGUE: {
        icon: Briefcase,
        label: "Colleague",
    },

    OTHER: {
        icon: User,
        label: "Other",
    },
} satisfies Record<RelationType, any>;