/*
===============================================================================
File: mec_cost_allocation_full_reconstructed.sql
Project: Amazon Pharmacy Finance - MEC Cost Allocation
Source: User-shared screenshots, reconstructed in order by visible line numbers.

Coverage:
  - Lines 1–1295 approximately
  - user_data
  - fulfillment data and allocation
  - external rate cards
  - docupack/RXA work unit calculations
  - front-end headcount
  - small-format employee data
  - shipped units
  - Cognos/manual cost summary
  - billing/RXA/DE hours split
  - master allocation and final output

Important:
  - This is reconstructed from screenshots, not a direct source export.
  - Some lines may need verification against original code where screenshot text was cropped.
  - Search TODO_VERIFY_IMAGE if you want to review uncertain areas.
===============================================================================
*/


-- =============================================================================
-- SECTION 1: USER DATA
-- =============================================================================

CREATE OR REPLACE TEMP VIEW user_data AS (
    SELECT *
    FROM d_users
    WHERE deleted = 'false'
);

CACHE TABLE user_data;


-- =============================================================================
-- SECTION 2: FULFILLMENT DATA & ALLOCATION
-- =============================================================================

-- Approx. line 013
CREATE OR REPLACE TEMP VIEW fulfillment_data AS (
    SELECT
        dep.cost_center AS cost_center
        ,(CASE
            WHEN LOWER(dep.amazon_warehouse_id) IN ('ppx1', 'ppx2') THEN 'PPX1'
            ELSE dep.amazon_warehouse_id
        END) AS amazon_warehouse_id
        ,(CASE
            WHEN POSITION('kaleo' IN LOWER(dep.cost_code_level_5)) > 0 THEN 'fridge'
            WHEN LOWER(dep.cost_code_level_4) = 'packets'
                AND POSITION('support' IN LOWER(dep.cost_code_level_5)) = 0 THEN 'packet'
            WHEN (
                LOWER(dep.cost_code_level_4) IN ('manual fill', 'bb2', 'auto vial')
                AND POSITION('support' IN LOWER(dep.cost_code_level_5)) = 0
            )
                OR POSITION('auto vial operator' IN LOWER(dep.full_cost_code)) > 0 THEN 'bulk'
            WHEN POSITION('support' IN LOWER(dep.cost_code_level_5)) > 0
                OR POSITION('support' IN LOWER(dep.cost_code_level_4)) > 0 THEN 'indirect'
            WHEN POSITION('fridge' IN LOWER(dep.full_cost_code)) > 0 THEN 'fridge'
            WHEN LOWER(dep.cost_code_level_3) = 'outbound'
                AND LOWER(dep.cost_code_level_4) = 'pack'
                AND LOWER(dep.cost_code_level_5) <> 'fridge' THEN 'shipments'
            WHEN LOWER(dep.cost_code_level_4) = 'ic/c'
                AND POSITION('support' IN LOWER(dep.full_cost_code)) = 0 THEN 'IC'
            ELSE 'indirect'
        END) AS classification
        ,dep.total_hours AS productive_hours
        ,COALESCE(dep.anchor_date, dep.time_out) AS time
        ,YEAR(COALESCE(dep.anchor_date, dep.time_out)) AS year
        ,MONTH(COALESCE(dep.anchor_date, dep.time_out)) AS month
    FROM d_employee_productivity AS dep
    WHERE
        (
            (
                UPPER(dep.amazon_warehouse_id) IN ('PAU2', 'PSE1')
                AND COALESCE(dep.anchor_date, dep.time_out) >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
                AND COALESCE(dep.anchor_date, dep.time_out) < TO_DATE('2025-05-28', 'yyyy-MM-dd')
            )
            OR
            (
                UPPER(dep.amazon_warehouse_id) IN ('PPX1', 'PPX2', 'PIN2', 'PMI2')
                AND COALESCE(dep.anchor_date, dep.time_out) >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
                AND COALESCE(dep.anchor_date, dep.time_out) < TO_DATE('2025-06-04', 'yyyy-MM-dd')
            )
        )
        AND dep.cost_center IN ('7267', '7268')
        AND LOWER(dep.job_title) NOT IN ('staff pharmacist', 'per diem staff pharmacist')
        AND POSITION('controllable' IN LOWER(dep.full_cost_code)) = 0

    UNION

    SELECT
        fclm.cost_center AS cost_center
        ,(CASE
            WHEN LOWER(fclm.amazon_warehouse_id) IN ('ppx1', 'ppx2') THEN 'PPX1'
            ELSE fclm.amazon_warehouse_id
        END) AS amazon_warehouse_id
        ,(CASE
            WHEN LOWER(fclm.core_process_name) = 'packet' THEN 'packet'
            WHEN LOWER(fclm.labor_process_name) LIKE '%fridge%' THEN 'fridge'
            WHEN LOWER(fclm.core_process_name) = 'bulk' THEN 'bulk'
            WHEN fclm.labor_process_id IN ('100575', '100584', '100593', '100596', '100707', '100724', '100725', '100712') THEN 'indirect'
            WHEN LOWER(fclm.main_process_name) = 'outbound'
                AND LOWER(fclm.core_process_name) = 'pack'
                AND fclm.labor_process_id NOT IN ('100706', '100920') THEN 'shipments'
            WHEN LOWER(fclm.core_process_name) = 'inventory management'
                AND POSITION('ic/c' IN LOWER(fclm.labor_process_name)) > 0 THEN 'IC'
            ELSE 'indirect'
        END) AS classification
        ,fclm.total_hours AS productive_hours
        ,fclm.anchor_date AS time
        ,YEAR(fclm.anchor_date) AS year
        ,MONTH(fclm.anchor_date) AS month
    FROM D_FCLM_EMPLOYEE_PRODUCTIVITY AS fclm
    WHERE
        (
            (
                UPPER(fclm.amazon_warehouse_id) IN ('PAU2', 'PSE1')
                AND fclm.anchor_date >= TO_DATE('2025-05-28', 'yyyy-MM-dd')
                AND fclm.anchor_date < DATE_TRUNC('MM', CURRENT_DATE())
            )
            OR
            (
                UPPER(fclm.amazon_warehouse_id) IN ('PPX1', 'PPX2', 'PIN2', 'PMI2')
                AND fclm.anchor_date >= TO_DATE('2025-06-04', 'yyyy-MM-dd')
                AND fclm.anchor_date < DATE_TRUNC('MM', CURRENT_DATE())
            )
            OR
            (
                UPPER(fclm.amazon_warehouse_id) NOT IN ('PMH1', 'PAU2', 'PSE1', 'PPX1', 'PPX2', 'PIN2', 'PMI2')
                AND fclm.anchor_date >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
                AND fclm.anchor_date < DATE_TRUNC('MM', CURRENT_DATE())
            )
        )
        AND fclm.cost_center IN ('7267', '7268', '7270')
        -- Job title filter applies to 7267, 7268 only, not 7270
        AND (
            fclm.cost_center = '7270'
            OR LOWER(fclm.job_title) NOT IN ('staff pharmacist', 'per diem staff pharmacist')
        )
        AND (
            POSITION('controllable' IN LOWER(fclm.labor_process_name)) = 0
            AND POSITION('controllable' IN LOWER(fclm.core_process_name)) = 0
        )
);

CACHE TABLE fulfillment_data;


CREATE OR REPLACE TEMP VIEW fulfillment_data2 AS (
    SELECT
        year
        ,month
        ,amazon_warehouse_id
        ,(CASE
            WHEN classification IN ('indirect', 'shipments', 'units', 'IC') THEN 'other'
            ELSE classification
        END) AS form_factor
        ,SUM(CASE WHEN cost_center = '7267' THEN productive_hours ELSE 0 END) AS productive_hours_fc_tech
        ,SUM(CASE WHEN cost_center = '7270' THEN productive_hours ELSE 0 END) AS productive_hours_fc_rph
        ,SUM(CASE WHEN cost_center = '7268' THEN productive_hours ELSE 0 END) AS productive_hours_sf_tech
    FROM fulfillment_data
    GROUP BY 1, 2, 3, 4
);

CACHE TABLE fulfillment_data2;


CREATE OR REPLACE TEMP VIEW fulfillment_work_unit AS (
    SELECT
        YEAR(cp.shipment_finalized_at_datetime) AS year
        ,MONTH(cp.shipment_finalized_at_datetime) AS month
        ,(CASE
            WHEN cp.amazon_warehouse_id IN ('PPX1', 'PPX2') THEN 'PPX1'
            ELSE cp.amazon_warehouse_id
        END) AS amazon_warehouse_id
        ,cp.form_factor AS form_factor
        ,SUM(shipped_units) AS unit_count
    FROM d_dispenses_contribution_profit AS cp
    WHERE cp.shipment_finalized_at_datetime >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
        AND cp.shipment_finalized_at_datetime < DATE_TRUNC('MM', CURRENT_DATE())
    GROUP BY 1, 2, 3, 4
);

CACHE TABLE fulfillment_work_unit;


CREATE OR REPLACE TEMP VIEW avg_hour_per_unit AS (
    SELECT
        fulfillment_data2.year
        ,fulfillment_data2.month
        ,fulfillment_data2.form_factor
        ,SUM(fulfillment_data2.productive_hours_fc_tech) * 1.00 / SUM(fulfillment_work_unit.unit_count) AS productive_hours_per_unit_fc_tech
        ,SUM(fulfillment_data2.productive_hours_fc_rph) * 1.00 / SUM(fulfillment_work_unit.unit_count) AS productive_hours_per_unit_fc_rph
        ,SUM(fulfillment_data2.productive_hours_sf_tech) * 1.00 / SUM(fulfillment_work_unit.unit_count) AS productive_hours_per_unit_sf_tech
        ,(
            productive_hours_per_unit_fc_tech
            + productive_hours_per_unit_fc_rph
            + productive_hours_per_unit_sf_tech
        ) AS productive_hours_per_unit
    FROM fulfillment_data2
    LEFT JOIN fulfillment_work_unit
        ON fulfillment_data2.year = fulfillment_work_unit.year
        AND fulfillment_data2.month = fulfillment_work_unit.month
        AND fulfillment_data2.amazon_warehouse_id = fulfillment_work_unit.amazon_warehouse_id
        AND fulfillment_data2.form_factor = fulfillment_work_unit.form_factor
    WHERE LOWER(fulfillment_data2.form_factor) IN ('fridge', 'packet', 'bulk')
    GROUP BY 1, 2, 3
);

CACHE TABLE avg_hour_per_unit;


CREATE OR REPLACE TEMP VIEW fulfillment_allocation AS (
    SELECT
        year
        ,month
        ,amazon_warehouse_id
        ,form_factor
        ,productive_hours_fc_tech
        ,productive_hours_fc_rph
        ,productive_hours_sf_tech
        ,productive_hours_fc_tech * 1.00
            / NULLIF(SUM(productive_hours_fc_tech) OVER (PARTITION BY year, month, amazon_warehouse_id), 0)
            AS productive_hours_allocation_fc_tech
        ,productive_hours_fc_rph * 1.00
            / NULLIF(SUM(productive_hours_fc_rph) OVER (PARTITION BY year, month, amazon_warehouse_id), 0)
            AS productive_hours_allocation_fc_rph
        ,productive_hours_sf_tech * 1.00
            / NULLIF(SUM(productive_hours_sf_tech) OVER (PARTITION BY year, month, amazon_warehouse_id), 0)
            AS productive_hours_allocation_sf_tech
    FROM fulfillment_data2
);

CACHE TABLE fulfillment_allocation;


-- Filters external input for non-pivot rate card entries
CREATE OR REPLACE TEMP VIEW non_pivot_rate_cards AS (
    SELECT *
    FROM s3_segmented_ctf_external_input
    WHERE input_pivot_type IN ('non_pivot_fc', 'non_pivot_sf', 'non_pivot_ph')
);

CACHE TABLE non_pivot_rate_cards;


-- Filters external input for pivot rate card entries
CREATE OR REPLACE TEMP VIEW pivot_rate_cards AS (
    SELECT
        year
        ,month
        ,SUM(CASE WHEN LOWER(item) = 'payroll_cc' THEN amount ELSE 0 END) AS payroll_cc
        ,SUM(CASE WHEN LOWER(item) = 'payroll_qa' THEN amount ELSE 0 END) AS payroll_qa
        ,SUM(CASE WHEN LOWER(item) = 'payroll_ccc' THEN amount ELSE 0 END) AS payroll_ccc
        ,SUM(CASE WHEN LOWER(item) = 'small_format_fulfillment' THEN amount ELSE 0 END) AS small_format_fulfillment
        ,SUM(CASE WHEN LOWER(item) = 'fridge_cost_per_shipment' THEN amount ELSE 0 END) AS fridge_cost_per_shipment
    FROM s3_segmented_ctf_external_input
    WHERE input_pivot_type = 'pivot'
    GROUP BY 1, 2
);

CACHE TABLE pivot_rate_cards;


-- =============================================================================
-- SECTION 3: DOCUPACK DOCUMENT PROCESSING
-- =============================================================================

CREATE OR REPLACE TEMP VIEW time_in_queue AS (
    SELECT
        ddh.document_history_id AS docupack_history_id
        ,ddh.document_id
        ,ddh.moved_from_queue AS current_queue
        ,ddh.moved_to_queue
        ,admin_id AS state_change_by_id
        ,ddh.change_timestamp AS state_change_at
        ,RANK() OVER (
            PARTITION BY ddh.document_id
            ORDER BY ddh.change_date_pst DESC
        ) AS rank
    FROM d_docupack_documents_histories AS ddh
    WHERE 1 = 1
        AND LOWER(ddh.action) = 'transitioned'
);

CACHE TABLE time_in_queue;


CREATE OR REPLACE TEMP VIEW last_event AS (
    SELECT
        NULL AS docupack_history_id
        ,docupack_documents.document_id
        ,CASE
            WHEN LOWER(docupack_documents.subqueue) = 'none' THEN 'unsorted'
            WHEN LOWER(docupack_documents.queue) = 'unsorted'
                AND LOWER(docupack_documents.subqueue) = 'dataentry' THEN 'unsorted'
            WHEN LOWER(docupack_documents.queue) = 'unsorted'
                AND LOWER(docupack_documents.subqueue) = 'nof' THEN 'unsortednof'
            WHEN LOWER(docupack_documents.queue) = 'trash' THEN 'trash'
            ELSE docupack_documents.subqueue
        END AS current_queue
        ,NULL AS moved_to_queue
        ,NULL AS state_change_by_id
        ,TO_DATE(NULL, 'yyyy-MM-dd') AS state_change_at
        ,1 AS count_queue_moves
    FROM d_docupack_documents AS docupack_documents
    LEFT JOIN time_in_queue
        ON docupack_documents.document_id = time_in_queue.document_id
    WHERE 1 = 1
        AND COALESCE(rank, 1) = 1
        AND LOWER(docupack_documents.subqueue) != 'confirmed'
);

CACHE TABLE last_event;


CREATE OR REPLACE TEMP VIEW typed AS (
    SELECT *
    FROM (
        SELECT
            ddh.document_id
            ,ddh.document_history_id AS docupack_history_id
            ,ddh.change_timestamp AS typed_at
            ,admin_id AS typed_by_admin_id
            ,RANK() OVER (
                PARTITION BY ddh.document_id
                ORDER BY ddh.document_id, ddh.change_timestamp ASC
            ) AS rank
        FROM d_docupack_documents_histories AS ddh
        WHERE 1 = 1
            AND LOWER(ddh.action) = 'transitioned'
            AND LOWER(moved_from_queue) = 'dataentry'
            AND LOWER(moved_to_queue) IN ('prerphcheck', 'rphcheck')
    ) AS x
    WHERE x.rank = 1
);

CACHE TABLE typed;


CREATE OR REPLACE TEMP VIEW all_records AS (
    SELECT
        docupack_history_id
        ,document_id
        ,current_queue
        ,moved_to_queue
        ,state_change_by_id
        ,state_change_at
        ,count_queue_moves
    FROM last_event

    UNION

    SELECT
        ddh.document_history_id AS docupack_history_id
        ,ddh.document_id
        ,ddh.moved_from_queue AS current_queue
        ,ddh.moved_to_queue
        ,admin_id AS state_change_by_id
        ,ddh.change_timestamp AS state_change_at
        ,COUNT(DISTINCT ddh.document_history_id) AS count_queue_moves
    FROM d_docupack_documents_histories AS ddh
    WHERE LOWER(ddh.action) = 'transitioned'
    GROUP BY 1, 2, 3, 4, 5, 6
);

CACHE TABLE all_records;


CREATE OR REPLACE TEMP VIEW docupack_document_histories_temp AS (
    SELECT
        all_records.docupack_history_id
        ,all_records.document_id || all_records.current_queue AS concatenated_document_queue
        ,all_records.document_id
        ,RANK() OVER (
            PARTITION BY all_records.document_id
            ORDER BY all_records.state_change_at ASC
        ) AS time_in_queue_rank
        ,all_records.current_queue
        ,all_records.moved_to_queue AS moved_to_queue
        ,docupack_documents.created_at AS document_created_at
        ,all_records.state_change_by_id
        ,all_records.state_change_at
        ,typed.docupack_history_id AS typed_event_id
        ,typed.typed_at
        ,typed.typed_by_admin_id
    FROM d_docupack_documents AS docupack_documents
    LEFT JOIN all_records
        ON all_records.document_id = docupack_documents.document_id
    LEFT JOIN typed
        ON typed.document_id = docupack_documents.document_id
    WHERE docupack_documents.created_at >= TO_DATE('2019-01-01', 'yyyy-MM-dd')
);

CACHE TABLE docupack_document_histories_temp;


-- =============================================================================
-- SECTION 4: RXA WORK UNIT CALCULATIONS
-- =============================================================================

CREATE OR REPLACE TEMP VIEW rxa_denials1 AS (
    SELECT
        *
        ,CAST(productive_hours AS DECIMAL(38,10))
            / SUM(productive_hours) OVER (PARTITION BY year, month) AS productive_hours_percentage
    FROM (
        SELECT
            YEAR(COALESCE(anchor_date, time_out)) AS year
            ,MONTH(COALESCE(anchor_date, time_out)) AS month
            ,CASE
                WHEN POSITION('refill' IN LOWER(full_cost_code)) > 0 THEN 'refill'
                ELSE 'other'
            END AS get_refill
            ,SUM(total_hours) AS productive_hours
        FROM d_employee_productivity
        WHERE cost_center = '7279'
            AND fclm_code IN ('8', '30', '22', '43')
            AND POSITION('shared labor' IN LOWER(full_cost_code)) = 0
            AND POSITION('misc' IN LOWER(full_cost_code)) = 0
            AND (
                CASE
                    WHEN LOWER(cost_code_level_2) = 'refill' THEN 'Refill'
                    ELSE LEFT(cost_code_level_2, GREATEST(POSITION(':' IN cost_code_level_2) - 1, 0))
                END
            ) = 'RD'
            AND COALESCE(anchor_date, time_out) >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
            AND COALESCE(anchor_date, time_out) < DATE_TRUNC('MM', CURRENT_DATE())
        GROUP BY 1, 2, 3
    )
);

CACHE TABLE rxa_denials1;


CREATE OR REPLACE TEMP VIEW rxa_denials2 AS (
    SELECT
        YEAR(ddh.state_change_at) AS year
        ,MONTH(ddh.state_change_at) AS month
        ,(CASE WHEN au.user_id IS NULL THEN 'pillpack' ELSE 'amazon_pharmacy' END) AS storefront
        ,(CASE
            WHEN (
                docupack_documents.created_at <= users.onboard_datetime
                OR users.current_step = 'confirmed'
                OR docupack_documents.scan_pod_id IS NOT NULL
            ) THEN 'new_med_rx'
            ELSE 'renewal_med_rx_and_refill'
        END) AS prescription_type_special
        ,COUNT(DISTINCT CASE
            WHEN UPPER(docupack_documents.document_type) = UPPER('DeniedPrescription')
                THEN docupack_documents.ID
            ELSE NULL
        END) AS quantity_requested
    FROM docupack_document_histories_temp AS ddh
    LEFT JOIN s_ppc_docupack_documents AS docupack_documents
        ON docupack_documents.id = ddh.document_id
    LEFT JOIN user_data AS users
        ON users.ID = docupack_documents.user_id
    LEFT JOIN (SELECT * FROM apex_users WHERE deleted_at IS NULL) au
        ON users.id = au.user_id
    WHERE ddh.state_change_at >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
        AND ddh.state_change_at < DATE_TRUNC('MM', CURRENT_DATE())
        AND UPPER(ddh.current_queue) = UPPER('DataEntry')
        AND POSITION('created by transfer of rx' IN LOWER(docupack_documents.body)) = 0
        AND (
            UPPER(docupack_documents.document_type) = UPPER('DeniedPrescription')
            OR LOWER(docupack_documents.body) IS NULL
        )
        AND (
            UPPER(docupack_documents.queue) <> UPPER('Trash')
            AND UPPER(docupack_documents.queue) <> UPPER('Unsorted')
            OR docupack_documents.queue IS NULL
        )
        AND (
            state_change_by_id <> '6322447bbb9b761669cd9f26'
            OR state_change_by_id IS NULL
        )
    GROUP BY 1, 2, 3, 4
);

CACHE TABLE rxa_denials2;


CREATE OR REPLACE TEMP VIEW rxa_denials_refill AS (
    SELECT *
    FROM (
        SELECT
            *
            ,SUM(quantity_requested) OVER (PARTITION BY year, month, storefront) AS storefront_quantity_requested
        FROM rxa_denials2
    )
    WHERE POSITION('renewal_med_rx' IN LOWER(prescription_type_special)) > 0
);

CACHE TABLE rxa_denials_refill;


CREATE OR REPLACE TEMP VIEW rxa_denials3 AS (
    SELECT
        rxa_denials1.year
        ,rxa_denials1.month
        ,rxa_denials_refill.storefront
        ,rxa_denials1.productive_hours_percentage * rxa_denials_refill.storefront_quantity_requested AS denial_refill_count
        ,rxa_denials_refill.quantity_requested
            - rxa_denials1.productive_hours_percentage * rxa_denials_refill.storefront_quantity_requested AS denial_renewal_count
    FROM rxa_denials1
    LEFT JOIN rxa_denials_refill
        ON rxa_denials1.year = rxa_denials_refill.year
        AND rxa_denials1.month = rxa_denials_refill.month
    WHERE get_refill = 'refill'
);

CACHE TABLE rxa_denials3;


CREATE OR REPLACE TEMP VIEW rxa_denials4 AS (
    SELECT
        year
        ,month
        ,storefront
        ,prescription_type_special AS prescription_type
        ,quantity_requested AS work_unit
    FROM rxa_denials2
    WHERE prescription_type_special = 'new_med_rx' -- get new med

    UNION ALL

    SELECT
        year
        ,month
        ,storefront
        ,'renewal_med_rx' AS prescription_type
        ,denial_renewal_count AS work_unit
    FROM rxa_denials3 -- get renewal

    UNION ALL

    SELECT
        year
        ,month
        ,storefront
        ,'refill' AS prescription_type
        ,denial_refill_count AS work_unit
    FROM rxa_denials3 -- get refill
);

CACHE TABLE rxa_denials4;


CREATE OR REPLACE TEMP VIEW rxa_rxc AS (
    SELECT
        YEAR(ddh.change_timestamp) AS year
        ,MONTH(ddh.change_timestamp) AS month
        ,(CASE WHEN au.user_id IS NULL THEN 'pillpack' ELSE 'amazon_pharmacy' END) AS storefront
        ,(CASE
            WHEN DD.created_at <= users.onboard_datetime
                OR (CASE WHEN users.current_step = 'confirmed' THEN TRUE ELSE FALSE END)
                OR DD.scan_pod_id IS NOT NULL THEN 'new_med_rx'
            ELSE 'renewal_med_rx'
        END) AS prescription_type
        ,COUNT(DISTINCT ddh.document_history_id) AS work_unit
    FROM d_docupack_documents_histories ddh
    LEFT JOIN d_docupack_documents dd
        ON dd.document_id = ddh.document_id
    LEFT JOIN user_data AS users
        ON users.ID = dd.user_id
    LEFT JOIN (SELECT * FROM apex_users WHERE deleted_at IS NULL) au
        ON users.id = au.user_id
    WHERE action = 'Transitioned'
        AND moved_from_queue = 'FollowUp'
        AND ddh.change_timestamp >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
        AND ddh.change_timestamp < DATE_TRUNC('MM', CURRENT_DATE())
    GROUP BY 1, 2, 3, 4
);

CACHE TABLE rxa_rxc;


CREATE OR REPLACE TEMP VIEW rxa_ib AS (
    SELECT
        YEAR(shipment_finalized_at_datetime) AS year
        ,MONTH(shipment_finalized_at_datetime) AS month
        ,storefront
        ,prescription_type
        ,COUNT(DISTINCT prescription_id) AS work_unit
    FROM d_dispenses_contribution_profit AS cp
    WHERE shipment_finalized_at_datetime >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
        AND shipment_finalized_at_datetime < DATE_TRUNC('MM', CURRENT_DATE())
        AND prescription_type IS NOT NULL
    GROUP BY 1, 2, 3, 4
);

CACHE TABLE rxa_ib;


CREATE OR REPLACE TEMP VIEW rxa_productivity_hours AS (
    SELECT
        YEAR(COALESCE(dep.anchor_date, dep.time_out)) AS year
        ,MONTH(COALESCE(dep.anchor_date, dep.time_out)) AS month
        ,(CASE
            WHEN LOWER(cost_code_level_2) = 'refill' THEN 'Refill'
            ELSE LEFT(cost_code_level_2, GREATEST(POSITION(':' IN cost_code_level_2) - 1, 0))
        END) AS team
        ,SUM(dep.total_hours) AS productive_hours
        ,SUM(dep.total_hours) * 1.00
            / SUM(SUM(dep.total_hours)) OVER (
                PARTITION BY YEAR(COALESCE(dep.anchor_date, dep.time_out)),
                             MONTH(COALESCE(dep.anchor_date, dep.time_out))
            ) AS productive_hours_percentage
    FROM d_employee_productivity AS dep
    WHERE dep.cost_center = '7279'
        AND dep.fclm_code IN ('8', '30', '22', '43')
        AND POSITION('shared labor' IN LOWER(full_cost_code)) = 0
        AND POSITION('misc' IN LOWER(full_cost_code)) = 0
        AND LENGTH(CASE
            WHEN LOWER(cost_code_level_2) = 'refill' THEN 'Refill'
            ELSE LEFT(cost_code_level_2, GREATEST(POSITION(':' IN cost_code_level_2) - 1, 0))
        END) > 1 -- this line is for length(team) > 1
        AND COALESCE(dep.anchor_date, dep.time_out) >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
        AND COALESCE(dep.anchor_date, dep.time_out) < DATE_TRUNC('MM', CURRENT_DATE())
    GROUP BY 1, 2, 3
);

CACHE TABLE rxa_productivity_hours;


CREATE OR REPLACE TEMP VIEW rxa_ib_rxc_rd AS (
    SELECT
        work_unit_count.*
        ,work_unit * 1.00
            / SUM(work_unit) OVER (
                PARTITION BY work_unit_count.year, work_unit_count.month, work_unit_count.team
            ) AS count_percentage
        ,count_percentage * rxa_productivity_hours.productive_hours_percentage AS rxa_allocation
    FROM (
        SELECT 'RD' AS team, * FROM rxa_denials4

        UNION ALL

        SELECT 'RXC' AS team, * FROM rxa_rxc

        UNION ALL

        SELECT 'IB' AS team, * FROM rxa_ib
    ) AS work_unit_count
    LEFT JOIN rxa_productivity_hours
        ON work_unit_count.team = rxa_productivity_hours.team
        AND work_unit_count.year = rxa_productivity_hours.year
        AND work_unit_count.month = rxa_productivity_hours.month
);

CACHE TABLE rxa_ib_rxc_rd;


-- =============================================================================
-- SECTION 5: FRONT END HEADCOUNT & RATE CARDS
-- =============================================================================

CREATE OR REPLACE TEMP VIEW fe_headcount AS (
    SELECT
        *
        ,avg_employee_count
            / SUM(avg_employee_count) OVER (PARTITION BY record_year, record_month) AS hc_weight
    FROM (
        SELECT
            YEAR(TO_DATE(tom.my_date, 'yyyy-MM-dd')) AS record_year
            ,MONTH(TO_DATE(tom.my_date, 'yyyy-MM-dd')) AS record_month
            ,hrbi.department_id
            ,COUNT(hrbi.amazon_employee_id) * 1.0
                / COUNT(DISTINCT TO_DATE(tom.my_date, 'yyyy-MM-dd')) AS avg_employee_count
        FROM d_employee_details hrbi
        INNER JOIN ap_ingest_time_object_mapping tom
            ON TO_DATE(tom.my_date, 'yyyy-MM-dd') >= hrbi.effective_date
            AND TO_DATE(tom.my_date, 'yyyy-MM-dd') <= (
                CASE
                    WHEN hrbi.end_effective_date > hrbi.termination_date THEN hrbi.termination_date
                    ELSE hrbi.end_effective_date
                END
            )
        WHERE hrbi.department_id IN ('7278', '7279')
            AND hrbi.termination_date IS NULL
            AND TO_DATE(tom.my_date, 'yyyy-MM-dd') >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
            AND TO_DATE(tom.my_date, 'yyyy-MM-dd') < DATE_TRUNC('MM', CURRENT_DATE())
        GROUP BY 1, 2, 3
    )
);

CACHE TABLE fe_headcount;


CREATE OR REPLACE TEMP VIEW fe_headcount_weight AS (
    SELECT
        record_year
        ,record_month
        ,SUM(CASE WHEN department_id = '7278' THEN hc_weight ELSE 0 END) AS department_7278
        ,SUM(CASE WHEN department_id = '7279' THEN hc_weight ELSE 0 END) AS department_7279
    FROM fe_headcount
    GROUP BY record_year, record_month
);

CACHE TABLE fe_headcount_weight;


-- =============================================================================
-- SECTION 6: SMALL FORMAT EMPLOYEE DATA
-- =============================================================================

CREATE OR REPLACE TEMP VIEW sf_employee_data AS (
    SELECT
        ded.*
        ,tom.my_date
        ,(CASE
            WHEN TRIM(employee_class_description) = 'Regular Full Time' THEN 1
            WHEN TRIM(employee_class_description) = 'Regular Reduced Time 30 + Hrs' THEN 0.75
            WHEN TRIM(employee_class_description) = 'Regular Part Time - 20 + Hours' THEN 0.5
            WHEN TRIM(employee_class_description) = 'Regular Flex Time - < 20 Hrs' THEN 0.25
            WHEN LOWER(TRIM(employee_class_description)) = 'intern' THEN 0.5
            ELSE 0.5
        END) AS fte_headcount
    FROM d_employee_details ded
    INNER JOIN ap_ingest_time_object_mapping tom
        ON TO_DATE(tom.my_date, 'yyyy-MM-dd') >= ded.effective_date
        AND TO_DATE(tom.my_date, 'yyyy-MM-dd') <= (
            CASE
                WHEN ded.end_effective_date > ded.termination_date THEN ded.termination_date
                ELSE ded.end_effective_date
            END
        )
    WHERE department_id = '7278'
        AND DAY(CAST(tom.my_date AS DATE)) = 28
        AND tom.my_date >= TO_DATE('2025-01-01', 'yyyy-MM-dd')
        AND tom.my_date < DATE_TRUNC('MM', CURRENT_DATE())
        AND fclm_code = '24'
    ORDER BY 1, 2
);


CREATE OR REPLACE TEMP VIEW sf_employee_data2 AS (
    SELECT
        YEAR(CAST(my_date AS DATE)) AS year
        ,MONTH(CAST(my_date AS DATE)) AS month
        ,location_building
        ,SUM(fte_headcount) AS fte_headcount
    FROM sf_employee_data
    GROUP BY 1, 2, 3
);


CREATE OR REPLACE TEMP VIEW sf_work_hour AS (
    SELECT
        *
        ,work_hours * 1.0 / SUM(work_hours) OVER (PARTITION BY year, month) AS hours_perc
    FROM (
        SELECT
            EXTRACT(YEAR FROM anchor_date) AS year
            ,EXTRACT(MONTH FROM anchor_date) AS month
            ,(CASE
                WHEN main_process_name IN ('Untracked Labor Hours', 'Inbound', 'Production', 'Outbound', 'FC Support', 'FC RPh', 'Off Task', 'Sort')
                    THEN 'fulfillment'
                ELSE 'rph_check'
            END) AS work_type
            ,SUM(total_hours) AS work_hours
        FROM d_fclm_employee_productivity
        WHERE 1 = 1
            AND cost_center = 7278
            AND fclm_code = 24
            AND anchor_date >= '2025-06-01'
            AND anchor_date < DATE_TRUNC('month', CURRENT_DATE)
        GROUP BY 1, 2, 3
    )
);


-- =============================================================================
-- SECTION 7: SHIPPED UNITS BASE TABLE
-- =============================================================================

CREATE OR REPLACE TEMP VIEW shipped_units AS (
    SELECT
        *
        ,CASE
            WHEN is_small_format_fc = 'false'
                THEN (
                    shipment_count * 1.00 / SUM(shipment_count) OVER (PARTITION BY amazon_warehouse_id_combine_ppx)
                ) * 1.00
                / (
                    shipment_count * 1.00 / SUM(shipment_count) OVER (PARTITION BY amazon_warehouse_id_combine_ppx, form_factor)
                )
                * staging_regional_fulfillment_percentage
        END AS staging_regional_fulfillment_indirect_percentage

        ,CASE
            WHEN is_small_format_fc = 'true'
                THEN (
                    shipment_count * 1.00 / SUM(shipment_count) OVER (PARTITION BY amazon_warehouse_id_combine_ppx)
                ) * 1.00
                / (
                    shipment_count * 1.00 / SUM(shipment_count) OVER (PARTITION BY amazon_warehouse_id_combine_ppx, form_factor)
                )
                * staging_sf_fulfillment_percentage
        END AS staging_sf_fulfillment_indirect_percentage

    FROM (
        SELECT
            *
            -- below logic only generate 4 digits, need to change later
            ,postage_adj * 1000000 * 1.0
                / SUM(postage_adj) OVER (PARTITION BY year, month, ship_method_group_adj)
                AS staging_postage_allocation
            ,(CASE
                WHEN form_factor <> 'fridge' THEN unit_count * 1.00
             END)
                / SUM(CASE WHEN form_factor <> 'fridge' THEN unit_count END)
                    OVER (PARTITION BY year, month)
                AS staging_packaging_percentage
            ,(CASE
                WHEN form_factor <> 'fridge' THEN shipment_count * 1.00
             END)
                / SUM(CASE WHEN form_factor <> 'fridge' THEN shipment_count END)
                    OVER (PARTITION BY year, month, form_factor)
                AS staging_packaging_percentage2
            ,unit_count * 1.00
                / SUM(unit_count) OVER (PARTITION BY year, month, storefront, customer_type, acquisition_program)
                AS staging_cs_percentage
            ,unit_count * 1.00
                / SUM(unit_count) OVER (PARTITION BY year, month, storefront, prescription_type)
                AS staging_rxa_ib_rxc_percentage
            ,(CASE
                WHEN LOWER(prescription_ingress) NOT IN ('dfp', 'prescriptionless')
                    THEN unit_count
             END)
                / SUM(CASE
                    WHEN LOWER(prescription_ingress) NOT IN ('dfp', 'prescriptionless')
                        THEN unit_count
                  END) OVER (PARTITION BY year, month, storefront, prescription_type)
                AS staging_rxa_nmc_tt_percentage
            ,(CASE
                WHEN LEFT(customer_type, 3) = 'new'
                    AND LEFT(LOWER(storefront), 8) = 'pillpack'
                    AND LOWER(form_factor) = 'packet'
                    THEN user_count
             END)
                / SUM(CASE
                    WHEN LEFT(customer_type, 3) = 'new'
                        AND LEFT(LOWER(storefront), 8) = 'pillpack'
                        AND LOWER(form_factor) = 'packet'
                        THEN user_count
                  END) OVER (PARTITION BY year, month)
                AS staging_wt_allocation
            ,unit_count * 1.00
                / SUM(unit_count) OVER (PARTITION BY year, month, storefront, prescription_ingress, prescription_type, customer_type, rx_type)
                AS staging_DE_RPH_percentage
            ,unit_count * 1.00
                / SUM(unit_count) OVER (PARTITION BY year, month, storefront, prescription_type, customer_type, rx_type, prescription_ingress, payment_program_adj)
                AS staging_billing_percentage
            ,CASE
                WHEN is_small_format_fc = 'true'
                    THEN unit_count * 1.00
                        / SUM(CASE WHEN is_small_format_fc = 'true' THEN unit_count END)
                            OVER (PARTITION BY year, month, amazon_warehouse_id_combine_ppx, form_factor)
             END AS staging_sf_fulfillment_percentage
            ,CASE
                WHEN is_small_format_fc = 'false'
                    THEN unit_count * 1.00
                        / SUM(CASE WHEN is_small_format_fc = 'false' THEN unit_count END)
                            OVER (PARTITION BY year, month, amazon_warehouse_id_combine_ppx, form_factor)
             END AS staging_regional_fulfillment_percentage
            ,unit_count * 1.00 / SUM(unit_count) OVER (PARTITION BY year, month) AS staging_allocation_by_units

        FROM (
            SELECT
                YEAR(cp.shipment_finalized_at_datetime) AS year
                ,MONTH(cp.shipment_finalized_at_datetime) AS month
                ,(CASE
                    WHEN cp.amazon_warehouse_id IN ('PPX1', 'PPX2') THEN 'PPX1'
                    ELSE cp.amazon_warehouse_id
                 END) AS amazon_warehouse_id_combine_ppx
                ,cp.storefront
                ,cp.is_small_format_fc
                ,cp.prescription_ingress
                ,COALESCE(cp.payment_program, 'U&C') AS payment_program_adj
                ,cp.form_factor AS form_factor
                ,cp.prescription_type
                ,cp.customer_type
                ,cp.brand_generic_otc AS rx_type
                ,COALESCE(cp.acquisition_program, 'NULL') AS acquisition_program
                ,LEFT(cp.ship_method, COALESCE(GREATEST(POSITION('_' IN cp.ship_method) - 1, 0), 1)) AS ship_method_group
                ,(CASE
                    WHEN LOWER(ship_method_group) IN ('ups', 'usps') THEN 'ups_usps'
                    ELSE 'amzl'
                 END) AS ship_method_group_adj
                ,SUM(shipped_units) AS unit_count
                ,COUNT(DISTINCT cp.user_id) AS user_count
                ,COUNT(DISTINCT cp.shipment_id) AS shipment_count
                ,COALESCE(SUM(COALESCE(cp.postage_transactional, 0)), 0) AS postage_adj
            FROM d_dispenses_contribution_profit AS cp
            WHERE cp.shipment_finalized_at_datetime >= TO_DATE('2024-01-01', 'yyyy-MM-dd')
                AND cp.shipment_finalized_at_datetime < DATE_TRUNC('MM', CURRENT_DATE())
            GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
            HAVING SUM(shipped_units) > 0
        )
    )
);

CACHE TABLE shipped_units;


-- =============================================================================
-- SECTION 8: COGNOS COST SUMMARY
-- =============================================================================

CREATE OR REPLACE TEMP VIEW cognos_cost_summary AS (
    SELECT
        period
        ,SUM(CASE WHEN account_id IN ('57100') THEN amount END) AS postage_ups
        ,SUM(CASE WHEN account_id IN ('57101', '57103', '57400', '57401', '52305') THEN amount END) AS postage_amazon
        ,SUM(CASE WHEN account_id IN ('57500', '57600') THEN amount END) AS packaging

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id IN ('7277', '1131')
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS customer_service_base

        ,SUM(CASE
            WHEN cost_center_id IN ('7277', '1131')
                AND channel_id = '5558'
                AND account_id LIKE '6%'
            THEN amount
        END) AS customer_service_remove

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id = '7270'
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS regional_fc_rph

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id = '7268'
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS small_format_tech

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id = '7278'
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS rph_check

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id = '7279'
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS billing -- represents billing + data entry + rxa

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id IN ('7267')
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS regional_fc_tech

        ,SUM(CASE
            WHEN cost_type = 'V'
                AND cost_center_id IN ('7275', '7280')
                AND account_id LIKE '6%'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS ops_var

        ,SUM(CASE
            WHEN cost_center_id IN ('1774')
                AND (account_parent_id = 'A6010' OR account_id = '68350')
            THEN amount
        END) AS field_fixed_hc_cs

        ,SUM(CASE
            WHEN cost_center_id IN ('1332')
                AND (account_parent_id = 'A6010' OR account_id = '68350')
            THEN amount
        END) AS field_fixed_hc_fe

        ,SUM(CASE
            WHEN cost_center_id IN ('7276')
                AND (account_parent_id = 'A6010' OR account_id = '68350')
            THEN amount
        END) AS field_fixed_hc_fulfillment

        ,SUM(CASE
            WHEN data_source = 'notrevgp_restricted'
                AND account_id LIKE '6%'
                AND cost_type = 'F'
                AND cost_center_parent_id = 'C911'
                AND (account_parent_id != 'A6100' OR account_parent_id IS NULL)
                AND (account_parent_id2 NOT IN ('A6250', 'A6260') OR account_parent_id2 IS NULL)
            THEN amount
        END) AS field_fixed_ex_hc_base

        ,SUM(CASE
            WHEN data_source = 'notrevgp_restricted'
                AND account_id LIKE '6%'
                AND cost_type = 'F'
                AND cost_center_parent_id = 'C777'
                AND account_parent_id = 'A6700'
                AND location_id IN (
                    SELECT DISTINCT childid
                    FROM S_GFT_AP_DIMENSION_HIERARCHY_ROLLUP
                    WHERE hiername = 'COGNOS_LOCATION_HIERARCHY'
                        AND memberof = '120'
                        AND childid NOT IN ('LTOT', '100', '101', '120')
                )
            THEN amount
        END) AS field_fixed_ex_hc_add

        ,SUM(CASE
            WHEN data_source = 'notrevgp_restricted'
                AND account_id LIKE '6%'
                AND cost_type = 'F'
                AND cost_center_parent_id = 'C777'
                AND location_id IN ('5886')
            THEN amount
        END) AS field_fixed_ex_hc_add2
    FROM cognos_base
    WHERE account_id != '67999'
    GROUP BY 1
);

CACHE TABLE cognos_cost_summary;


CREATE OR REPLACE TEMP VIEW cognos_cost_summary2 AS (
    SELECT
        period
        ,postage_ups
        ,postage_amazon
        ,packaging
        ,COALESCE(customer_service_base, 0) - COALESCE(customer_service_remove, 0) AS customer_service
        ,regional_fc_rph
        ,small_format_tech
        ,rph_check
        ,billing
        ,regional_fc_tech
        ,ops_var
        ,COALESCE(field_fixed_ex_hc_base, 0)
            + COALESCE(field_fixed_ex_hc_add, 0)
            + COALESCE(field_fixed_ex_hc_add2, 0)
            - COALESCE(field_fixed_hc_cs, 0)
            - COALESCE(field_fixed_hc_fe, 0)
            - COALESCE(field_fixed_hc_fulfillment, 0) AS field_fixed_ex_hc
        ,field_fixed_hc_cs
        ,field_fixed_hc_fe
        ,field_fixed_hc_fulfillment
    FROM cognos_cost_summary
    ORDER BY 1
);

CACHE TABLE cognos_cost_summary2;


-- Final cost summary
CREATE OR REPLACE TEMP VIEW cost_summary AS (
    SELECT
        COALESCE(EXTRACT(YEAR FROM CAST(cognos_cost_summary2.period AS DATE)), manual_monthly_cost.year) AS year
        ,COALESCE(EXTRACT(MONTH FROM CAST(cognos_cost_summary2.period AS DATE)), manual_monthly_cost.month) AS month
        ,COALESCE(manual_monthly_cost.postage_cost_part1, cognos_cost_summary2.postage_ups, 0)
            + COALESCE(manual_delta.postage_cost_part1, 0) AS postage_cost_ups
        ,COALESCE(manual_monthly_cost.postage_cost_part2, cognos_cost_summary2.postage_amazon, 0)
            + COALESCE(manual_delta.postage_cost_part2, 0) AS postage_cost_amazon
        ,COALESCE(manual_monthly_cost.packaging_cost, cognos_cost_summary2.packaging, 0)
            + COALESCE(manual_delta.packaging_cost, 0) AS packaging_cost
        ,COALESCE(manual_monthly_cost.cs_cost, cognos_cost_summary2.customer_service, 0)
            + COALESCE(manual_delta.cs_cost, 0) AS cs_cost
        ,COALESCE(manual_monthly_cost.regional_fc_rph_cost, cognos_cost_summary2.regional_fc_rph, 0)
            + COALESCE(manual_delta.regional_fc_rph_cost, 0) AS regional_fc_rph_cost
        ,COALESCE(manual_monthly_cost.small_format_tech_cost, cognos_cost_summary2.small_format_tech, 0)
            + COALESCE(manual_delta.small_format_tech_cost, 0) AS small_format_tech_cost
        ,COALESCE(manual_monthly_cost.regional_fc_tech_cost, cognos_cost_summary2.regional_fc_tech, 0)
            + COALESCE(manual_delta.regional_fc_tech_cost, 0) AS regional_fc_tech_cost
        ,COALESCE(manual_monthly_cost.rph_check_cost, cognos_cost_summary2.rph_check, 0)
            + COALESCE(manual_delta.rph_check_cost, 0) AS rph_check_cost
        ,COALESCE(manual_monthly_cost.billing_cost, cognos_cost_summary2.billing, 0)
            + COALESCE(manual_delta.billing_cost, 0) AS billing_cost
        ,COALESCE(manual_monthly_cost.other_ops_cost, cognos_cost_summary2.ops_var, 0)
            + COALESCE(manual_delta.other_ops_cost, 0) AS other_ops_cost
        ,COALESCE(manual_monthly_cost.fix_ex_hc_cost, cognos_cost_summary2.field_fixed_ex_hc, 0)
            + COALESCE(manual_delta.fix_ex_hc_cost, 0) AS fix_ex_hc_cost
        ,COALESCE(manual_monthly_cost.ff_cs_cost, cognos_cost_summary2.field_fixed_hc_cs, 0)
            + COALESCE(manual_delta.ff_cs_cost, 0) AS ff_cs_cost
        ,COALESCE(manual_monthly_cost.ff_fe_cost, cognos_cost_summary2.field_fixed_hc_fe, 0)
            + COALESCE(manual_delta.ff_fe_cost, 0) AS ff_fe_cost
        ,COALESCE(manual_monthly_cost.ff_fulfillment_cost, cognos_cost_summary2.field_fixed_hc_fulfillment, 0)
            + COALESCE(manual_delta.ff_fulfillment_cost, 0) AS ff_fulfillment_cost
    FROM cognos_cost_summary2
    FULL JOIN (
        SELECT
            *
            ,CAST(CONCAT(CONCAT(CONCAT(year, '-'), LPAD(month, 2, '0')), '-01') AS DATE) AS period
        FROM s3_segmented_ctf_cost_input
        WHERE item_type = 'monthly'
    ) AS manual_monthly_cost
        ON CAST(cognos_cost_summary2.period AS DATE) = manual_monthly_cost.period
    LEFT JOIN (
        SELECT
            *
            ,CAST(CONCAT(CONCAT(CONCAT(year, '-'), LPAD(month, 2, '0')), '-01') AS DATE) AS period
        FROM s3_segmented_ctf_cost_input
        WHERE item_type = 'delta'
    ) AS manual_delta
        ON CAST(cognos_cost_summary2.period AS DATE) = manual_delta.period
);

CACHE TABLE cost_summary;


-- lines 888-895
CREATE OR REPLACE TEMP VIEW cost_input_recent_year_month AS (
    SELECT
        year
        ,month
    FROM cost_summary
    ORDER BY year DESC, month DESC
    LIMIT 1
);

CACHE TABLE cost_input_recent_year_month;


-- lines 899-906
CREATE OR REPLACE TEMP VIEW pivot_input_recent_year_month AS (
    SELECT
        year
        ,month
    FROM pivot_rate_cards
    ORDER BY year DESC, month DESC
    LIMIT 1
);

CACHE TABLE pivot_input_recent_year_month;


-- =============================================================================
-- SECTION 9: BILLING/RXA/DE HOURS-BASED COST SPLIT
-- =============================================================================

-- lines 912-921
CREATE OR REPLACE TEMP VIEW pharmacy_ps_techs_productivity_hours AS (
    SELECT
        YEAR(COALESCE(tcp.anchor_date, tcp.time_out)) AS year
        ,MONTH(COALESCE(tcp.anchor_date, tcp.time_out)) AS month
        ,tcp.fclm_code
        ,SUM(tcp.total_hours) AS total_hours
    FROM d_employee_productivity tcp
    WHERE tcp.cost_center = '7279'
    GROUP BY 1, 2, 3
);


-- Categorize hours by FCLM codes into RXA, DE, and Billing buckets
-- lines 924-952
CREATE OR REPLACE TEMP VIEW pharmacy_ps_techs_data AS (
    SELECT
        ptph.year
        ,ptph.month
        ,'rxa' AS flag
        ,SUM(CASE WHEN ptph.fclm_code IN ('8', '30', '22', '43') THEN ptph.total_hours ELSE 0 END) AS productive_hours
    FROM pharmacy_ps_techs_productivity_hours ptph
    GROUP BY ptph.year, ptph.month

    UNION ALL

    SELECT
        ptph.year
        ,ptph.month
        ,'de' AS flag
        ,SUM(CASE WHEN ptph.fclm_code IN ('32') THEN ptph.total_hours ELSE 0 END) AS productive_hours
    FROM pharmacy_ps_techs_productivity_hours ptph
    GROUP BY ptph.year, ptph.month

    UNION ALL

    SELECT
        ptph.year
        ,ptph.month
        ,'billing' AS flag
        ,SUM(CASE WHEN ptph.fclm_code IN ('37', '25', '38', '39') THEN ptph.total_hours ELSE 0 END) AS productive_hours
    FROM pharmacy_ps_techs_productivity_hours ptph
    GROUP BY ptph.year, ptph.month
);


-- Calculate proportional allocation percentages for RXA, DE, Billing split
-- lines 955-963
CREATE OR REPLACE TEMP VIEW pharmacy_ps_techs_data_allocation AS (
    SELECT
        *
        ,CASE
            WHEN SUM(productive_hours) OVER (PARTITION BY year, month) = 0 THEN 0
            ELSE productive_hours * 1.00 / NULLIF(SUM(productive_hours) OVER (PARTITION BY year, month), 0)
        END AS productive_hours_allocation
    FROM pharmacy_ps_techs_data
);

CACHE TABLE pharmacy_ps_techs_data_allocation;


-- =============================================================================
-- SECTION 10: MASTER ALLOCATION AND COST
-- =============================================================================

-- lines 968-1099 approx.
CREATE OR REPLACE TEMP VIEW master_allocation_and_cost AS (
    SELECT
        shipped_units.*

        -- cs related
        ,cc_allocation.handle_time_in_minutes * staging_cs_percentage AS cc_handle_time_in_minutes
        ,ccc_allocation.handle_time_in_minutes * staging_cs_percentage AS ccc_handle_time_in_minutes
        ,cc_allocation.handle_time_in_minutes * staging_cs_percentage * 1.00 * 1000000
            / SUM(cc_allocation.handle_time_in_minutes * staging_cs_percentage)
                OVER (PARTITION BY shipped_units.year, shipped_units.month) AS cc_allocation
        ,ccc_allocation.handle_time_in_minutes * staging_cs_percentage * 1.00 * 1000000
            / SUM(ccc_allocation.handle_time_in_minutes * staging_cs_percentage)
                OVER (PARTITION BY shipped_units.year, shipped_units.month) AS ccc_allocation

        -- rxa related
        ,rxa_ib_rxc_rd_allocation.rxa_allocation * staging_rxa_ib_rxc_percentage * 1000000 AS rxa_ib_rxc_rd_allocation
        ,(CASE
            WHEN shipped_units.storefront = 'pillpack'
             AND shipped_units.prescription_type = 'new_med_rx'
                THEN nmc_tt_allocation.productive_hours_percentage * staging_rxa_nmc_tt_percentage
            END) * 1000000 AS nmc_tt_allocation
        ,wt_allocation.productive_hours_percentage * staging_wt_allocation * 1000000 AS wt_allocation

        -- de and rph check related
        ,de_allocation.work_unit_count * staging_DE_RPH_percentage AS de_work_unit
        ,(de_allocation.work_unit_count * staging_DE_RPH_percentage * 1.00 * 1000000)
            / SUM(de_allocation.work_unit_count * staging_DE_RPH_percentage)
                OVER (PARTITION BY shipped_units.year, shipped_units.month) AS de_allocation
        ,rph_check_allocation.work_unit_count * staging_DE_RPH_percentage AS rph_check_work_unit
        ,(rph_check_allocation.work_unit_count * staging_DE_RPH_percentage * 1.00 * 1000000)
            / SUM(rph_check_allocation.work_unit_count * staging_DE_RPH_percentage)
                OVER (PARTITION BY shipped_units.year, shipped_units.month) AS rph_check_allocation

        -- billing related
        ,billing_allocation.work_unit_count * staging_billing_percentage AS billing_unit
        ,billing_allocation.productivity_hours_storefront_split
            * (billing_allocation.work_unit_count * staging_billing_percentage * 1.00 * 1000000)
            / SUM(billing_allocation.work_unit_count * staging_billing_percentage)
                OVER (PARTITION BY shipped_units.year, shipped_units.month, shipped_units.storefront) AS billing_allocation

        -- fulfillment related
        -- Fulfillment Split
        ,fulfillment_allocation_indirect.productive_hours_fc_tech
            * staging_regional_fulfillment_indirect_percentage AS regional_fc_tech_indirect_hours
        ,fulfillment_allocation_indirect.productive_hours_fc_rph
            * staging_regional_fulfillment_indirect_percentage AS regional_fc_rph_indirect_hours
        ,fulfillment_allocation_indirect.productive_hours_sf_tech
            * staging_sf_fulfillment_indirect_percentage AS small_format_tech_indirect_hours

        -- Fulfillment Split
        ,COALESCE(
            fulfillment_allocation.productive_hours_fc_tech * staging_regional_fulfillment_percentage,
            avg_hour_per_unit.productive_hours_per_unit_fc_tech * shipped_units.shipment_count
        ) AS regional_fc_tech_direct_hours
        ,COALESCE(
            fulfillment_allocation.productive_hours_fc_rph * staging_regional_fulfillment_percentage,
            avg_hour_per_unit.productive_hours_per_unit_fc_rph * shipped_units.shipment_count
        ) AS regional_fc_rph_direct_hours
        ,COALESCE(
            fulfillment_allocation.productive_hours_sf_tech * staging_sf_fulfillment_percentage,
            avg_hour_per_unit.productive_hours_per_unit_sf_tech * shipped_units.shipment_count
        ) AS small_format_tech_direct_hours

        -- small format related
        ,COALESCE(
            SUM(avg_hour_per_unit.productive_hours_per_unit_sf_tech * shipped_units.shipment_count)
                OVER (PARTITION BY shipped_units.year, shipped_units.month, shipped_units.form_factor),
            SUM(sf_employee_data2.fc_headcount)
                OVER (PARTITION BY shipped_units.year, shipped_units.month, shipped_units.amazon_warehouse_id_combine_ppx)
        ) / SUM(avg_hour_per_unit.productive_hours_per_unit_sf_tech * shipped_units.shipment_count)
                OVER (PARTITION BY shipped_units.year, shipped_units.month, shipped_units.amazon_warehouse_id_combine_ppx)
            * 1.00
            / SUM(sf_employee_data2.fc_headcount)
                OVER (PARTITION BY shipped_units.year, shipped_units.month)
            AS small_format_form_factor
        ,small_format_facility * staging_sf_fulfillment_percentage * 1000000 AS small_format_fc_allocation

    FROM shipped_units

    -- cs related
    LEFT JOIN (SELECT * FROM finance_cs_work_unit WHERE business_area = 'CC') AS cc_allocation
        ON shipped_units.year = cc_allocation.year
        AND shipped_units.month = cc_allocation.month
        AND LOWER(shipped_units.storefront) = LOWER(cc_allocation.storefront)
        AND LOWER(shipped_units.customer_type) = LOWER(cc_allocation.customer_type)
        AND (
            LOWER(shipped_units.acquisition_program) = LOWER(cc_allocation.acquisition_program)
            OR LOWER(cc_allocation.acquisition_program) = 'all'
        )

    LEFT JOIN (SELECT * FROM finance_cs_work_unit WHERE business_area = 'CCC') AS ccc_allocation
        ON shipped_units.year = ccc_allocation.year
        AND shipped_units.month = ccc_allocation.month
        AND LOWER(shipped_units.storefront) = LOWER(ccc_allocation.storefront)
        AND LOWER(shipped_units.customer_type) = LOWER(ccc_allocation.customer_type)
        AND (
            LOWER(shipped_units.acquisition_program) = LOWER(ccc_allocation.acquisition_program)
            OR LOWER(ccc_allocation.acquisition_program) = 'all'
        )

    -- rxa related
    LEFT JOIN (
        SELECT
            year
            ,month
            ,storefront
            ,prescription_type
            ,SUM(rxa_allocation) AS rxa_allocation
        FROM rxa_ib_rxc_rd
        GROUP BY 1, 2, 3, 4
    ) AS rxa_ib_rxc_rd_allocation
        ON rxa_ib_rxc_rd_allocation.year = shipped_units.year
        AND rxa_ib_rxc_rd_allocation.month = shipped_units.month
        AND rxa_ib_rxc_rd_allocation.storefront = shipped_units.storefront
        AND rxa_ib_rxc_rd_allocation.prescription_type = shipped_units.prescription_type

    LEFT JOIN (
        SELECT
            year
            ,month
            ,SUM(productive_hours_percentage) AS productive_hours_percentage
        FROM rxa_productivity_hours
        WHERE team IN ('NMC', 'TT')
        GROUP BY 1, 2
    ) AS nmc_tt_allocation
        ON nmc_tt_allocation.year = shipped_units.year
        AND nmc_tt_allocation.month = shipped_units.month

    LEFT JOIN (
        SELECT
            year
            ,month
            ,SUM(productive_hours_percentage) AS productive_hours_percentage
        FROM rxa_productivity_hours
        WHERE team IN ('WT')
        GROUP BY 1, 2
    ) AS wt_allocation
        ON wt_allocation.year = shipped_units.year
        AND wt_allocation.month = shipped_units.month

    -- de and rph check related
    LEFT JOIN (SELECT * FROM finance_de_rph_work_unit WHERE LOWER(business_area) = 'data entry') AS de_allocation
        ON shipped_units.year = de_allocation.year
        AND shipped_units.month = de_allocation.month
        AND LOWER(shipped_units.storefront) = LOWER(de_allocation.storefront)
        AND LOWER(shipped_units.customer_type) = LOWER(de_allocation.customer_type)
        AND LOWER(shipped_units.prescription_type) = LOWER(de_allocation.prescription_type)
        AND LOWER(shipped_units.rx_type) = LOWER(de_allocation.rx_type)
        AND LOWER(shipped_units.prescription_ingress) = LOWER(de_allocation.prescription_ingress)

    LEFT JOIN (SELECT * FROM finance_de_rph_work_unit WHERE LOWER(business_area) = 'rph check') AS rph_check_allocation
        ON shipped_units.year = rph_check_allocation.year
        AND shipped_units.month = rph_check_allocation.month
        AND LOWER(shipped_units.storefront) = LOWER(rph_check_allocation.storefront)
        AND LOWER(shipped_units.customer_type) = LOWER(rph_check_allocation.customer_type)
        AND LOWER(shipped_units.prescription_type) = LOWER(rph_check_allocation.prescription_type)
        AND LOWER(shipped_units.rx_type) = LOWER(rph_check_allocation.rx_type)
        AND LOWER(shipped_units.prescription_ingress) = LOWER(rph_check_allocation.prescription_ingress)

    -- billing related
    LEFT JOIN finance_billing_work_unit AS billing_allocation
        ON shipped_units.year = billing_allocation.year
        AND shipped_units.month = billing_allocation.month
        AND LOWER(shipped_units.storefront) = LOWER(billing_allocation.storefront)
        AND LOWER(shipped_units.customer_type) = LOWER(billing_allocation.customer_type)
        AND LOWER(shipped_units.prescription_type) = LOWER(billing_allocation.prescription_type)
        AND LOWER(shipped_units.rx_type) = LOWER(billing_allocation.rx_type)
        AND LOWER(shipped_units.payment_program_adj) = LOWER(billing_allocation.payment_program)
        AND LOWER(shipped_units.prescription_ingress) = LOWER(billing_allocation.prescription_ingress)

    -- fulfillment related
    LEFT JOIN (SELECT * FROM fulfillment_allocation WHERE LOWER(form_factor) = 'other') AS fulfillment_allocation_indirect
        ON shipped_units.year = fulfillment_allocation_indirect.year
        AND shipped_units.month = fulfillment_allocation_indirect.month
        AND LOWER(shipped_units.amazon_warehouse_id_combine_ppx) = LOWER(fulfillment_allocation_indirect.amazon_warehouse_id)

    LEFT JOIN (SELECT * FROM fulfillment_allocation WHERE LOWER(form_factor) <> 'other') AS fulfillment_allocation
        ON shipped_units.year = fulfillment_allocation.year
        AND shipped_units.month = fulfillment_allocation.month
        AND LOWER(shipped_units.amazon_warehouse_id_combine_ppx) = LOWER(fulfillment_allocation.amazon_warehouse_id)
        AND LOWER(shipped_units.form_factor) = LOWER(fulfillment_allocation.form_factor)

    -- packaging related
    LEFT JOIN avg_hour_per_unit
        ON avg_hour_per_unit.year = shipped_units.year
        AND avg_hour_per_unit.month = shipped_units.month
        AND LOWER(avg_hour_per_unit.form_factor) = LOWER(shipped_units.form_factor)

    -- small format related
    LEFT JOIN sf_employee_data2
        ON shipped_units.year = sf_employee_data2.year
        AND shipped_units.month = sf_employee_data2.month
        AND LOWER(shipped_units.amazon_warehouse_id_combine_ppx) = LOWER(sf_employee_data2.location_building)
);


-- lines 1098-1221 approx.
CREATE OR REPLACE TEMP VIEW base2 AS (
    SELECT
        base.*

        -- cs related
        ,ROUND(cc_allocation, 10) * COALESCE(pivot_rate_cards.payroll_cc, pivot_rate_cards_default.payroll_cc)
            + ROUND(cc_allocation, 10) * COALESCE(pivot_rate_cards.payroll_ccc, pivot_rate_cards_default.payroll_ccc)
            + ROUND(staging_allocation_by_units, 10) * COALESCE(pivot_rate_cards.payroll_qa, pivot_rate_cards_default.payroll_qa) * 1000000
            AS cs_allocation
        ,COALESCE(pivot_rate_cards.payroll_qa, pivot_rate_cards_default.payroll_qa) * COALESCE(cost.cs_cost, cost_default.cs_cost)
            AS cc_cost
        ,ROUND(ccc_allocation, 10) * COALESCE(pivot_rate_cards.payroll_ccc, pivot_rate_cards_default.payroll_ccc)
            AS ccc_cost
        ,COALESCE(cc_cost, 0) + COALESCE(ccc_cost, 0) AS cs_cost

        -- rxa related
        ,COALESCE(rxa_ib_rxc_rd_allocation, 0)
            + COALESCE(nmc_tt_allocation, 0)
            + COALESCE(wt_allocation, 0) AS rx_acquisition_allocation
        -- rxa_cost_staging = billing_cost * hours_split
        ,COALESCE(cost.billing_cost, cost_default.billing_cost, 0)
            * COALESCE(rxa_alloc.productive_hours_allocation, 0) AS rxa_cost_staging

        -- de_rph billing related
        ,COALESCE(cost.billing_cost, cost_default.billing_cost, 0)
            * COALESCE(de_alloc.productive_hours_allocation, 0)
            * ROUND(de_allocation, 10) AS de_cost

        -- rph related
        ,COALESCE(cost.rph_check_cost, cost_default.rph_check_cost, 0)
            * (1 - COALESCE(pivot_rate_cards.small_format_fulfillment, pivot_rate_cards_default.small_format_fulfillment))
            * COALESCE(sf_work_hour.hours_perc, 0.5)
            * ROUND(rph_check_allocation, 10) AS rph_check_cost

        -- billing_cost = billing_cost * hours_split * row_allocation
        ,COALESCE(cost.billing_cost, cost_default.billing_cost, 0)
            * COALESCE(billing_alloc.productive_hours_allocation, 0)
            * ROUND(billing_allocation, 10) AS billing_cost

        -- shipping related
        ,(
            (CASE
                WHEN ship_method_group_adj = 'ups_usps'
                    THEN COALESCE(cost.postage_cost_ups, cost_default.postage_cost_ups, 0) * ROUND(staging_postage_allocation, 10)
                ELSE 0
            END)
            + (CASE
                WHEN ship_method_group_adj = 'amzl'
                    THEN COALESCE(cost.postage_cost_amazon, cost_default.postage_cost_amazon, 0) * ROUND(staging_postage_allocation, 10)
                ELSE 0
            END)
        ) * 1.0 / 1000000 AS postage_cost

        ,(CASE
            WHEN base.form_factor = 'fridge'
                THEN COALESCE(pivot_rate_cards.fridge_cost_per_shipment, pivot_rate_cards_default.fridge_cost_per_shipment)
                    * shipment_count
            ELSE 0
        END) AS fridge_packaging_cost

        ,(
            COALESCE(cost.packaging_cost, cost_default.packaging_cost)
            - (
                SUM(CASE
                    WHEN base.form_factor = 'fridge'
                        THEN COALESCE(pivot_rate_cards.fridge_cost_per_shipment, pivot_rate_cards_default.fridge_cost_per_shipment)
                            * shipment_count
                    ELSE 0
                END) OVER (PARTITION BY base.year, base.month)
            )
        )
        * ROUND(
            SUM(staging_packaging_percentage) OVER (PARTITION BY base.year, base.month, base.form_factor)
            * shipment_count
            * 1.00
            / NULLIF(SUM(staging_packaging_percentage) OVER (PARTITION BY base.year, base.month, base.form_factor), 0),
            10
        ) AS non_fridge_packaging_cost

        ,COALESCE(regional_fc_tech_indirect_hours, 0)
            + COALESCE(regional_fc_tech_direct_hours, 0) AS regional_fc_tech_total_hours
        ,COALESCE(regional_fc_rph_indirect_hours, 0)
            + COALESCE(regional_fc_rph_direct_hours, 0) AS regional_fc_rph_total_hours
        ,COALESCE(small_format_tech_indirect_hours, 0)
            + COALESCE(small_format_tech_direct_hours, 0) AS small_format_tech_total_hours

        ,COALESCE(non_pivot_fc.amount, 0)
            * (COALESCE(regional_fc_tech_indirect_hours, 0)
            + COALESCE(regional_fc_tech_direct_hours, 0))
            * 1.00 * 1000000
            / NULLIF(SUM(COALESCE(regional_fc_tech_indirect_hours, 0)
            + COALESCE(regional_fc_tech_direct_hours, 0))
                OVER (PARTITION BY base.year, base.month, base.amazon_warehouse_id_combine_ppx), 0)
            AS regional_fc_tech_allocation

        ,COALESCE(non_pivot_ph.amount, 0)
            * (COALESCE(regional_fc_rph_indirect_hours, 0)
            + COALESCE(regional_fc_rph_direct_hours, 0))
            * 1.00 * 1000000
            / NULLIF(SUM(COALESCE(regional_fc_rph_indirect_hours, 0)
            + COALESCE(regional_fc_rph_direct_hours, 0))
                OVER (PARTITION BY base.year, base.month), 0)
            AS regional_fc_rph_allocation

        ,COALESCE(non_pivot_sf.amount, 0)
            * (COALESCE(small_format_tech_indirect_hours, 0)
            + COALESCE(small_format_tech_direct_hours, 0))
            * 1.00 * 1000000
            / NULLIF(SUM(COALESCE(small_format_tech_indirect_hours, 0)
            + COALESCE(small_format_tech_direct_hours, 0))
                OVER (PARTITION BY base.year, base.month, base.amazon_warehouse_id_combine_ppx), 0)
            AS small_format_tech_allocation

        ,COALESCE(cost.regional_fc_tech_cost, cost_default.regional_fc_tech_cost, 0)
            * ROUND(regional_fc_tech_allocation, 10) AS regional_fc_tech_cost_final
        ,COALESCE(cost.regional_fc_rph_cost, cost_default.regional_fc_rph_cost, 0)
            * ROUND(regional_fc_rph_allocation, 10) AS regional_fc_rph_cost_final
        ,COALESCE(cost.small_format_tech_cost, cost_default.small_format_tech_cost, 0)
            * ROUND(small_format_tech_allocation, 10) AS small_format_tech_cost_final

        -- small format
        ,COALESCE(regional_fc_tech_cost_final, 0)
            + COALESCE(regional_fc_rph_cost_final, 0)
            + COALESCE(small_format_tech_cost_final, 0) AS fulfillment_cost_final
        -- small_format_fc_allocation
        ,ROUND(
            COALESCE(cost.rph_check_cost, cost_default.rph_check_cost, 0)
            * (COALESCE(pivot_rate_cards.small_format_fulfillment, pivot_rate_cards_default.small_format_fulfillment))
            * COALESCE(sf_work_hour.hours_perc, 0.5),
            2
        ) * ROUND(small_format_fc_allocation, 6) AS small_format_fc_cost

        -- otherSFF related
        ,COALESCE(cost.other_ops_cost, cost_default.other_ops_cost, 0)
            * ROUND(staging_allocation_by_units, 10) AS other_ops_cost
        ,COALESCE(cost.ff_cs_cost, cost_default.ff_cs_cost, 0) AS field_fixed_cs_cost_staging
        ,COALESCE(rph_check_allocation * fe_hc.department_7278, 0)
            + COALESCE(billing_allocation * fe_hc.department_7279, 0) AS field_fixed_fe_allocation
        ,COALESCE(cost.ff_fe_cost, cost_default.ff_fe_cost, 0) AS field_fixed_fe_cost_staging
        ,COALESCE(cost.ff_fulfillment_cost, cost_default.ff_fulfillment_cost, 0) AS ff_fulfillment_cost_staging
        ,COALESCE(fulfillment_cost_final, 0)
            + COALESCE(small_format_fc_cost, 0) AS fc_cost_including_small_format -- Fulfillment Split
        ,COALESCE(cost.fix_ex_hc_cost, cost_default.fix_ex_hc_cost, 0)
            * ROUND(staging_allocation_by_units, 10) AS field_fixed_ex_hc_cost

    FROM master_allocation_and_cost AS base

    -- Hours split joins for RXA, DE, Billing
    LEFT JOIN pharmacy_ps_techs_data_allocation AS rxa_alloc
        ON base.year = rxa_alloc.year
        AND base.month = rxa_alloc.month
        AND rxa_alloc.flag = 'rxa'

    LEFT JOIN pharmacy_ps_techs_data_allocation AS de_alloc
        ON base.year = de_alloc.year
        AND base.month = de_alloc.month
        AND de_alloc.flag = 'de'

    LEFT JOIN pharmacy_ps_techs_data_allocation AS billing_alloc
        ON base.year = billing_alloc.year
        AND base.month = billing_alloc.month
        AND billing_alloc.flag = 'billing'

    -- ff fe related
    LEFT JOIN fe_headcount_weight AS fe_hc
        ON base.year = fe_hc.record_year
        AND base.month = fe_hc.record_month

    -- external_input_related
    LEFT JOIN cost_summary AS cost
        ON base.year = cost.year
        AND base.month = cost.month

    LEFT JOIN cost_input_recent_year_month
        ON 1 = 1

    LEFT JOIN cost_summary AS cost_default
        ON cost_default.year = cost_input_recent_year_month.year
        AND cost_default.month = cost_input_recent_year_month.month

    -- percentage breakdown for small format employees under RPH check
    LEFT JOIN sf_work_hour
        ON base.year = sf_work_hour.year
        AND base.month = sf_work_hour.month
        AND sf_work_hour.work_type = 'fulfillment'

    LEFT JOIN non_pivot_rate_cards AS non_pivot_fc
        ON base.year = non_pivot_fc.year
        AND base.month = non_pivot_fc.month
        AND base.amazon_warehouse_id_combine_ppx = non_pivot_fc.item
        AND non_pivot_fc.input_pivot_type = 'non_pivot_fc'

    LEFT JOIN non_pivot_rate_cards AS non_pivot_ph
        ON base.year = non_pivot_ph.year
        AND base.month = non_pivot_ph.month
        AND base.amazon_warehouse_id_combine_ppx = non_pivot_ph.item
        AND non_pivot_ph.input_pivot_type = 'non_pivot_ph'

    LEFT JOIN non_pivot_rate_cards AS non_pivot_sf
        ON base.year = non_pivot_sf.year
        AND base.month = non_pivot_sf.month
        AND base.amazon_warehouse_id_combine_ppx = non_pivot_sf.item
        AND non_pivot_sf.input_pivot_type = 'non_pivot_sf'

    LEFT JOIN pivot_rate_cards
        ON base.year = pivot_rate_cards.year
        AND base.month = pivot_rate_cards.month

    LEFT JOIN pivot_input_recent_year_month
        ON 1 = 1

    LEFT JOIN pivot_rate_cards AS pivot_rate_cards_default
        ON pivot_rate_cards_default.year = pivot_input_recent_year_month.year
        AND pivot_rate_cards_default.month = pivot_input_recent_year_month.month
);


-- lines 1223-1295
CREATE OR REPLACE TEMP VIEW master_allocation_and_cost2 AS (
    SELECT
        year
        ,month
        ,storefront
        ,customer_type
        ,prescription_type
        ,form_factor
        ,prescription_ingress
        ,rx_type
        ,payment_program_adj AS payment_program
        ,amazon_warehouse_id_combine_ppx AS facility
        ,acquisition_program
        ,ship_method_group
        ,CAST(unit_count AS DECIMAL(38,10)) AS unit_count
        ,CAST(user_count AS DECIMAL(38,10)) AS user_count
        ,CAST(shipment_count AS DECIMAL(38,10)) AS shipment_count
        ,CAST(cc_handle_time_in_minutes AS DECIMAL(38,10)) AS cc_handle_time_in_minutes
        ,CAST(ccc_handle_time_in_minutes AS DECIMAL(38,10)) AS ccc_handle_time_in_minutes
        ,CAST(cc_allocation / 1000000 AS DECIMAL(38,10)) AS cc_allocation
        ,CAST(ccc_allocation / 1000000 AS DECIMAL(38,10)) AS ccc_allocation
        ,CAST(cs_allocation / 1000000 AS DECIMAL(38,10)) AS cs_allocation
        ,CAST(cc_cost / 1000000 AS DECIMAL(38,10)) AS cc_cost
        ,CAST(ccc_cost / 1000000 AS DECIMAL(38,10)) AS ccc_cost
        ,CAST(cs_cost / 1000000 AS DECIMAL(38,10)) AS cs_cost
        ,CAST(rxa_ib_rxc_rd_allocation / 1000000 AS DECIMAL(38,10)) AS rxa_ib_rxc_rd_allocation
        ,CAST(nmc_tt_allocation / 1000000 AS DECIMAL(38,10)) AS nmc_tt_allocation
        ,CAST(wt_allocation / 1000000 AS DECIMAL(38,10)) AS wt_allocation
        ,CAST(rx_acquisition_allocation / 1000000 AS DECIMAL(38,10)) AS rx_acquisition_allocation
        ,CAST(ROUND(rx_acquisition_allocation, 10) * rxa_cost_staging / 1000000 AS DECIMAL(38,10)) AS rxa_cost
        ,CAST(de_work_unit AS DECIMAL(38,10)) AS de_work_unit
        ,CAST(de_allocation / 1000000 AS DECIMAL(38,10)) AS de_allocation
        ,CAST(de_cost / 1000000 AS DECIMAL(38,10)) AS de_cost
        ,CAST(rph_check_work_unit AS DECIMAL(38,10)) AS rph_check_work_unit
        ,CAST(rph_check_allocation / 1000000 AS DECIMAL(38,10)) AS rph_check_allocation
        ,CAST(rph_check_cost / 1000000 AS DECIMAL(38,10)) AS rph_check_cost
        ,CAST(billing_unit AS DECIMAL(38,10)) AS billing_unit
        ,CAST(billing_allocation / 1000000 AS DECIMAL(38,10)) AS billing_allocation
        ,CAST(billing_cost / 1000000 AS DECIMAL(38,10)) AS billing_cost
        ,CAST(postage_cost AS DECIMAL(38,10)) AS postage_cost
        ,CAST(fridge_packaging_cost AS DECIMAL(38,10)) AS fridge_packaging_cost
        ,CAST(non_fridge_packaging_cost AS DECIMAL(38,10)) AS non_fridge_packaging_cost
        ,CAST((CASE WHEN form_factor = 'fridge' THEN fridge_packaging_cost ELSE non_fridge_packaging_cost END) AS DECIMAL(38,10)) AS packaging_cost
        ,CAST(regional_fc_tech_indirect_hours AS DECIMAL(38,10)) AS regional_fc_tech_indirect_hours
        ,CAST(regional_fc_rph_indirect_hours AS DECIMAL(38,10)) AS regional_fc_rph_indirect_hours
        ,CAST(small_format_tech_indirect_hours AS DECIMAL(38,10)) AS small_format_tech_indirect_hours
        ,CAST(regional_fc_tech_direct_hours AS DECIMAL(38,10)) AS regional_fc_tech_direct_hours
        ,CAST(regional_fc_rph_direct_hours AS DECIMAL(38,10)) AS regional_fc_rph_direct_hours
        ,CAST(small_format_tech_direct_hours AS DECIMAL(38,10)) AS small_format_tech_direct_hours
        ,CAST(regional_fc_tech_total_hours AS DECIMAL(38,10)) AS regional_fc_tech_total_hours
        ,CAST(regional_fc_rph_total_hours AS DECIMAL(38,10)) AS regional_fc_rph_total_hours
        ,CAST(small_format_tech_total_hours AS DECIMAL(38,10)) AS small_format_tech_total_hours
        ,CAST(regional_fc_tech_allocation / 1000000 AS DECIMAL(38,10)) AS regional_fc_tech_allocation
        ,CAST(regional_fc_rph_allocation / 1000000 AS DECIMAL(38,10)) AS regional_fc_rph_allocation
        ,CAST(small_format_tech_allocation / 1000000 AS DECIMAL(38,10)) AS small_format_tech_allocation
        ,CAST(regional_fc_tech_cost_final / 1000000 AS DECIMAL(38,10)) AS regional_fc_tech_cost
        ,CAST(regional_fc_rph_cost_final / 1000000 AS DECIMAL(38,10)) AS regional_fc_rph_cost
        ,CAST(small_format_tech_cost_final / 1000000 AS DECIMAL(38,10)) AS small_format_tech_cost
        ,CAST(other_ops_cost AS DECIMAL(38,10)) AS other_ops_cost
        ,ROUND(cs_allocation, 10) * field_fixed_cs_cost_staging / 1000000 AS field_fixed_cs_cost
        ,CAST(field_fixed_fe_allocation / 1000000 AS DECIMAL(38,10)) AS field_fixed_fe_allocation
        ,CAST(ROUND(field_fixed_fe_allocation, 10) * field_fixed_fe_cost_staging / 1000000 AS DECIMAL(38,10)) AS field_fixed_fe_cost
        ,CAST(
            ROUND(field_fixed_fe_allocation, 10) * field_fixed_fe_cost_staging / 1000000
            * fc_cost_including_small_format * 1.00
            / SUM(fc_cost_including_small_format) OVER (PARTITION BY year, month)
            AS DECIMAL(38,10)
        ) AS field_fixed_fc_hc_cost
        ,CAST(field_fixed_ex_hc_cost AS DECIMAL(38,10)) AS field_fixed_ex_hc_cost
        ,CAST(small_format_fc_allocation / 1000000 AS DECIMAL(38,10)) AS small_format_fc_allocation
        ,CAST(small_format_fc_cost / 1000000 AS DECIMAL(38,10)) AS small_format_fc_cost
    FROM base2
);


SELECT *
FROM master_allocation_and_cost2;