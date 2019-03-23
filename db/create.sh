#!/usr/bin/env bash
  # -d postgres:10.7 

  docker run \
  --name pgdev \
  -e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=dev \
  -p 5433:5432 \
  -d mdillon/postgis 
  