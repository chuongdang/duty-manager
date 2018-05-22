<?php

namespace Entity;

class ScheduleUser extends Base
{
    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    protected $fk_schedule;

    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    protected $fk_user;

    /**
     *
     * @var integer
     * @Column(type="integer", nullable=false)
     */
    protected $order;

    /**
     * Method to set the value of field fk_schedule
     *
     * @param integer $fk_schedule
     * @return $this
     */
    public function setFkSchedule($fk_schedule)
    {
        $this->fk_schedule = $fk_schedule;

        return $this;
    }

    /**
     * Method to set the value of field fk_user
     *
     * @param integer $fk_user
     * @return $this
     */
    public function setFkUser($fk_user)
    {
        $this->fk_user = $fk_user;

        return $this;
    }

    /**
     * Method to set the value of field order
     *
     * @param integer $order
     * @return $this
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Returns the value of field fk_schedule
     *
     * @return integer
     */
    public function getFkSchedule()
    {
        return $this->fk_schedule;
    }

    /**
     * Returns the value of field fk_user
     *
     * @return integer
     */
    public function getFkUser()
    {
        return $this->fk_user;
    }

    /**
     * Returns the value of field order
     *
     * @return integer
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'schedule_user';
    }
}