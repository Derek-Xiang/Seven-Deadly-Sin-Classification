#!/bin/bash

. ./unimelb-comp90024-group-50-openrc.sh; ansible-playbook -i hosts.ini --ask-become-pass nectar.yaml