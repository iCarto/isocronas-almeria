#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini

dump_for_fixtures() {
    local file="${1}"
    rm -f "${file}"
    ${PGDUMP} -Fc -h localhost -U postgres -T 'django_*' -T 'auth_*' -T 'users_*' -f "${file}" "${DBNAME}"
}

restore_for_fixtures() {
    local file="${1}"
    ${PGRESTORE} -a --disable-triggers -h localhost -U postgres -d "${DBNAME}" "${file}"
}

crear_vacia() {
    true
}

prod() {
    file="${this_dir}/../tools/fixtures/fixtures_prod_${DBNAME}.dump"
    restore_for_fixtures "${file}"
}

synthetic() {
    file="${this_dir}/../tools/fixtures/fixtures_synthetic_${DBNAME}.dump"
    restore_for_fixtures "${file}"
}

raw() {
    bash "${this_dir}/fixtures.sh"
    file="${this_dir}/../tools/fixtures/fixtures_prod_${DBNAME}.dump"
    dump_for_fixtures "${file}"
}

prepare_synthetic() {
    raw
    ${PSQL} "${PG_CONNECTION}" -c "
    ALTER TABLE app_permit
        DROP CONSTRAINT app_permit_plot_id_584b4312_fk_app_plot_id
        , DROP CONSTRAINT app_permit_holder_id_b303d1f4_fk_app_holder_id;

    ALTER TABLE app_permit ADD CONSTRAINT app_permit_plot_id_584b4312_fk_app_plot_id FOREIGN KEY (plot_id) REFERENCES app_plot(id) ON DELETE CASCADE;

    ALTER TABLE app_permit ADD CONSTRAINT app_permit_holder_id_b303d1f4_fk_app_holder_id FOREIGN KEY (holder_id) REFERENCES app_holder(id) ON DELETE CASCADE;

    ALTER TABLE app_tree DROP CONSTRAINT app_tree_permit_id_9cd4b62b_fk_app_permit_id;

    ALTER TABLE app_tree ADD CONSTRAINT app_tree_permit_id_9cd4b62b_fk_app_permit_id FOREIGN KEY (permit_id) REFERENCES app_permit(id) ON DELETE CASCADE;

    DELETE FROM app_permit WHERE id > 30;

    UPDATE app_permit SET (felling, cutting, felling_start_date, felling_end_date, cutting_start_date, cutting_end_date, plot, holder) = (true, true, '2024-02-01', '2024-03-01', '2024-03-01', '2024-05-01', 1, 268) WHERE id = 1;
    UPDATE app_permit SET (felling, cutting, cutting_start_date, cutting_end_date) = (true, true, '2023-01-01', '2030-01-01') WHERE id = 2;
    UPDATE app_permit SET status = 'Pendente firma Direcção (S)' WHERE id = 3;
    UPDATE app_permit SET status = 'Não aprovada' WHERE id = 4;
    UPDATE app_permit SET (felling, cutting, transport) = (true, true, true) WHERE id = 5;
    UPDATE app_permit SET (felling, clearing) = (true, true) WHERE id = 6;
    UPDATE app_permit SET (cutting, clearing) = (true, true) WHERE id = 7;
    UPDATE app_permit SET (cutting, clearing, transport) = (true, true, true) WHERE id = 8;
    UPDATE app_holder SET (type, gender, doc_type, doc_number) = ('Particular', 'Masculino', 'BI', '59568') WHERE id = 268;
    UPDATE app_plot SET (number, land_ownership, land_use, land_cover, holder) = ('014', 'Media empresa', 'Concessão estatal', '{Não floresta}', 268) WHERE id = 1;
    UPDATE app_tree SET (code, species, quality, felling, height, diameter, volume, felling_fee, felling_price, permit_id) = ('0002/2022/A01', 'Pau Caixão', '1ª qualidade', true, '3,00', '2,00', '10,00', '10,00', '100,00', 1) WHERE id = 1;
    UPDATE app_tree SET (code, species, quality, cutting, height, diameter, volume, cutting_fee, cutting_price, permit_id) = ('0002/2022/A02', 'Jaqueira', '2ª qualidade', true, '3,00', '2,00', '10,00', '10,00', '100,00', 1) WHERE id = 2;

    INSERT INTO app_contact (name, phone, gender, holder_id) VALUES ('María', '1234565', 'Feminino', 1);

    INSERT INTO app_holder (
        name, type, address, gender, doc_type, doc_number, doc_expiration_date, comments
        , created_by_id, updated_by_id
    ) VALUES (
            'Jose Mendes Soares', 'Particular', 'São Tome, Cantagalo, Uba Budo', 'Masculino', 'BI', '696345', '2026-08-15', 'Propietário test. Presentação aplicativo. iCarto.', 1, 1
        ),
        (
            'Maria Mendes Abade', 'Particular', 'São Tome, Cantagalo, Uba Budo', 'Feminino', 'BI', '689461', '2028-10-20', 'Titular test. Presentação aplicativo. iCarto.', 1, 1
    );
    INSERT INTO app_contact (name, phone, email, comments, holder_id) VALUES
        ('Jose Mendes Soares', '65498741695', 'jmendes@mail.com', 'Concacto de teste. Presentação aplicativo. iCarto.', (SELECT id FROM app_holder where name = 'Jose Mendes Soares'));

    INSERT INTO app_contact (name, phone, email, comments, holder_id) VALUES
        ('Maria Mendes Abade', '69784594125', 'maria.mendes@mail.com', 'Concacto de teste. Presentação aplicativo. iCarto.', (SELECT id FROM app_holder where name = 'Maria Mendes Abade'));

    INSERT INTO app_plot (
        number, code, land_ownership, official_area, land_use, land_cover, state_concession, comments, island, district, locality, is_area_protected
        , holder_id
        , created_by_id, updated_by_id
    ) VALUES (
        '63', 'P/01378/ST', 'Estatal', 9000, 'Concessão estatal', '{Agrofloresta}', 'Lote', 'Parcela de teste. Presentação aplicativo. iCarto.', 'São Tomé', 'Cantagalo', 'Uba Budo', false
        , (SELECT id FROM app_holder where name = 'Jose Mendes Soares')
        , 1, 1
    );
    INSERT INTO app_permit (
        code, application_date, on_date, felling, cutting, clearing, transport, comments
        , holder_id
        , plot_id
        , inspection_date, inspection_team
        , felling_start_date, felling_end_date, felling_beneficiary
        , cutting_start_date, cutting_end_date, cutting_beneficiary
        , clearing_start_date, clearing_end_date, clearing_beneficiary, clearing_area, clearing_fee, clearing_price
        , transport_start_date, transport_end_date, transport_beneficiary, transport_price
        , felling_price, cutting_price, fuel_fee, printing_fee, restock_fee, total_due
        , created_by_id, updated_by_id
        , application_doc_valid, personal_id_doc_valid, plot_ownership_doc_valid, plot_use_authorization_valid, tax_id_doc_valid, is_the_plot_owner
        , island, district
        , status
    ) VALUES (
        '0001/2024/ST', '2024-04-29', '2024-05-10', true, true, true, true, 'Autorização não real. Presentação do aplicativo. iCarto.'
        , (SELECT id FROM app_holder where name = 'Maria Mendes Abade')
        , (SELECT id FROM app_plot where code = 'P/01378/ST')
        , '2024-05-05', 'Critina Neves, Alcino Diniz'
        , '2024-05-15', '2024-05-15', null
        , '2024-05-15', '2024-05-15', null
        , '2024-05-15', '2024-05-15', null, 3, 2000, 6000
        , '2024-06-01', '2024-07-01', 'Alberto Maquengo', 68
        , 339.46, 480, 100, 15, 40, 7042.46
        , 1, 1
        , false, false, false, false, false, false
        , 'São Tomé', 'Cantagalo'
        , 'Aprovada'
    );
    INSERT INTO app_tree (
        permit_id
        , code
        , species, quality, felling, cutting, height, diameter, volume, felling_fee, felling_price, number_of_logs, cutting_fee, cutting_price
        , created_by_id, updated_by_id, created_at, updated_at

    ) VALUES (
        (SELECT id FROM app_permit WHERE code = '0001/2024/ST')
        , '0001/2024/ST/01'
        , 'Jaqueira', '1ª qualidade', true, true, 12, 0.65, 3.384, 80, 270.773, 6, 80, 480
        , 1, 1, now(), now()
    ), (
        (SELECT id FROM app_permit WHERE code = '0001/2024/ST')
        , '0001/2024/ST/02'
        , 'Pau Mole', '2ª qualidade', true, false, 3, 0.7, 0.981, 70, 68.694, null, null, null
        , 1, 1, now(), now()
    );
    "
    file="${this_dir}/../tools/fixtures/fixtures_synthetic_${DBNAME}.dump"
    dump_for_fixtures "${file}"
}

case "${1}" in
    vacia)
        echo "Creando base de datos vacia"
        crear_vacia
        ;;
    prod)
        echo "Creando bd con datos de prod"
        prod
        ;;
    raw)
        echo "Creando bd a partir de datos en bruto"
        if [[ -f "${this_dir}/../tools/fixtures/users_user.sql" ]]; then
            echo "cargando usuarios externos"
            ${PSQL} "${PG_CONNECTION}" -f "${this_dir}/../tools/fixtures/users_user.sql"
        else
            DJANGO_SUPERUSER_PASSWORD="${DJANGO_SUPERUSER_PASSWORD}" python "${this_dir}/../back/manage.py" \
                createsuperuser --no-input --username admin \
                --departaments '["Gestão de SNIMF"]' --island "São Tomé" --active_islands '["São Tomé","Príncipe"]'
        fi

        raw
        ;;
    prepare_synthetic)
        echo "Creando bd con datos sintéticos"
        prepare_synthetic
        ;;
    synthetic)
        echo "Creando bd con datos sintéticos"
        synthetic
        ;;
    '') echo "" ;;
    *)
        echo "Error. Parámetro no reconocido"
        exit 1
        ;; # In case you typed a different option other than a,b,c
esac
