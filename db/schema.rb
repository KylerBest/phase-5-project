# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_21_204456) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: :cascade do |t|
    t.bigint "plumber_id", null: false
    t.bigint "job_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "join_date"
    t.index ["job_id"], name: "index_assignments_on_job_id"
    t.index ["plumber_id"], name: "index_assignments_on_plumber_id"
  end

  create_table "bills", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.decimal "amount"
    t.boolean "paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_bills_on_job_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.bigint "client_id"
    t.string "description"
    t.decimal "rate"
    t.decimal "hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.string "type_of_work"
    t.datetime "accept_date"
    t.datetime "start_date"
    t.datetime "finish_date"
    t.integer "open_slots"
    t.index ["client_id"], name: "index_jobs_on_client_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.string "phone"
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "address"
    t.decimal "wage"
    t.boolean "manager"
  end

  add_foreign_key "assignments", "jobs"
  add_foreign_key "assignments", "users", column: "plumber_id"
  add_foreign_key "bills", "jobs"
  add_foreign_key "jobs", "users", column: "client_id"
end
