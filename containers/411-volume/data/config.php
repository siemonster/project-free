<?php

$config = [];

/**
 *
 * Database configuration
 *
 */
$config['db'] = [
    'dsn' => 'sqlite:' . realpath('/data/data.db'),
    'user' => 'root',
    'pass' => null,
];


/**
 *
 * Search type configuration
 * Note: All hostnames should specify protocol!
 *
 */

# Elasticsearch configuration
$config['elasticsearch'] = [
    # Configuration for the 411 Alerts index.
    'alerts' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => null,
        'date_based' => false,
        'date_field' => 'alert_date',
        'src_url' => null,
    ],
    # Configuration for the logstash index that 411 queries.
    'logstash' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[logstash-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the ossec index that 411 queries.
    'ossec' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[ossec-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the syslog index that 411 queries.
    'syslog' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[syslog-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the apache index that 411 queries.
    'apache' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[logstash-apache-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the suricata index that 411 queries.
    'suricata' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[logstash-suricata-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the logstash-win index that 411 queries.
    'windows' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[logstash-win-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the honeypot index that 411 queries.
    'honeypot' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[logstash-honey-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
   # Configuration for the dockerbeat index that 411 queries.
    'dockbeat' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[dockbeat-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
    # Configuration for the hp index that 411 queries.
    'hp' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[hp-syslog-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
    # Configuration for the paloalto index that 411 queries.
    'paloalto' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[pan-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
    # Configuration for the bro index that 411 queries.
    'bro' => [
        'hosts' => ['http://es-client:9200'],
        'index_hosts' => [],
        'ssl_cert' => null,
        'index' => '[bro-]Y.m.d',
        'date_based' => true,
        'date_field' => '@timestamp',
        'src_url' => null,
    ],
];

# Graphite
# Fill in to enable the Graphite search
$config['graphite'] = [
    'host' => null,
];

# Threatexchange
# Fill in to enable the Threatexchange search
$config['threatexchange'] = [
    'api_token' => null,
    'api_secret' => null,
];


/**
 *
 * Target configuration
 *
 */

# Jira integration
# Fill in to allow 411 to generate Jira tickets.
$config['jira'] = [
    'host' => null,
    'user' => null,
    'pass' => null,
];

# Slack integration
# Fill in to allow 411 to send messages to Slack.
$config['slack'] = [
    'webhook_url' => null
];
